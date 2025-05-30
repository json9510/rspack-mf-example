#!/usr/bin/env python3
"""
MCP Server para API de Enerbit con autenticación automática
Incluye login automático para obtener JWT tokens
"""

import asyncio
import aiohttp
import json
import os
import logging
from typing import Optional, Dict, Any, List
from datetime import datetime, date

from mcp.server.fastmcp import FastMCP, Context

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("enerbit_mcp")

# Configuración de URLs
AUTH_URL = "https://back.enerbit.app/auth/token/"
BASE_URL = os.getenv("ENERBIT_BASE_URL", "https://ops.enerbit.me/billing")

# Variables globales para el token
_current_jwt_token = None
_auth_credentials = None

class EnerbitAPIError(Exception):
    """Excepción personalizada para errores de la API de Enerbit"""
    pass

class EnerbitAuthManager:
    """Administrador de autenticación para Enerbit"""
    
    @staticmethod
    async def login(username: str, password: str) -> str:
        """
        Realiza login y obtiene JWT token
        
        Args:
            username: Usuario de Enerbit
            password: Contraseña de Enerbit
            
        Returns:
            JWT token
        """
        logger.info(f"Intentando autenticación para usuario: {username}")
        
        # Datos del formulario
        form_data = aiohttp.FormData()
        form_data.add_field('username', username)
        form_data.add_field('password', password)
        
        timeout = aiohttp.ClientTimeout(total=10)
        
        try:
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.post(AUTH_URL, data=form_data) as response:
                    
                    response_text = await response.text()
                    logger.debug(f"Respuesta de login: Status {response.status}, Content: {response_text[:200]}...")
                    
                    if response.status == 401:
                        raise EnerbitAPIError("Credenciales inválidas")
                    elif response.status == 422:
                        raise EnerbitAPIError("Error de validación en credenciales")
                    elif response.status >= 400:
                        raise EnerbitAPIError(f"Error de autenticación: HTTP {response.status}")
                    
                    try:
                        auth_response = await response.json()
                    except json.JSONDecodeError:
                        raise EnerbitAPIError(f"Respuesta de autenticación inválida: {response_text}")
                    
                    # Extraer token de la respuesta
                    # Ajustar según la estructura real de la respuesta
                    if 'access_token' in auth_response:
                        token = auth_response['access_token']
                    elif 'token' in auth_response:
                        token = auth_response['token']
                    elif 'jwt' in auth_response:
                        token = auth_response['jwt']
                    else:
                        # Si la respuesta completa es el token
                        if isinstance(auth_response, str):
                            token = auth_response
                        else:
                            raise EnerbitAPIError(f"Token no encontrado en respuesta: {auth_response}")
                    
                    logger.info(f"✅ Autenticación exitosa, token obtenido: {token[:20]}...")
                    return token
                    
        except aiohttp.ClientError as e:
            raise EnerbitAPIError(f"Error de conexión durante autenticación: {str(e)}")
        except Exception as e:
            logger.error(f"Error inesperado durante autenticación: {e}")
            raise EnerbitAPIError(f"Error inesperado durante autenticación: {str(e)}")

class EnerbitClient:
    """Cliente HTTP para interactuar con la API de Enerbit"""
    
    def __init__(self, jwt_token: str = None):
        self.jwt_token = jwt_token or _current_jwt_token
        self.session = None
        
    async def __aenter__(self):
        if not self.jwt_token:
            raise EnerbitAPIError("No hay token JWT disponible. Ejecuta 'enerbit_login' primero.")
            
        self.session = aiohttp.ClientSession(
            headers={
                "Authorization": f"Bearer {self.jwt_token}",
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            timeout=aiohttp.ClientTimeout(total=30)
        )
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.session:
            await self.session.close()
    
    async def request(
        self, 
        method: str, 
        url: str, 
        data: Optional[Dict[str, Any]] = None,
        params: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Realiza una petición HTTP a la API"""
        
        if not self.session:
            raise EnerbitAPIError("Cliente no inicializado")
            
        try:
            async with self.session.request(
                method=method,
                url=url,
                json=data if method != "GET" else None,
                params=params
            ) as response:
                
                response_text = await response.text()
                
                # Si el token expiró, intentar renovarlo automáticamente
                if response.status == 401 and _auth_credentials:
                    logger.info("Token expirado, intentando renovar...")
                    try:
                        global _current_jwt_token
                        _current_jwt_token = await EnerbitAuthManager.login(
                            _auth_credentials['username'], 
                            _auth_credentials['password']
                        )
                        # Actualizar headers con nuevo token
                        self.session.headers.update({
                            "Authorization": f"Bearer {_current_jwt_token}"
                        })
                        # Reintentar la petición
                        async with self.session.request(
                            method=method,
                            url=url,
                            json=data if method != "GET" else None,
                            params=params
                        ) as retry_response:
                            response_text = await retry_response.text()
                            response = retry_response
                    except Exception as e:
                        logger.error(f"Error renovando token: {e}")
                
                # Manejo de códigos de estado HTTP
                if response.status == 401:
                    raise EnerbitAPIError("Token JWT inválido o expirado. Ejecuta 'enerbit_login' nuevamente.")
                elif response.status == 403:
                    raise EnerbitAPIError("Sin permisos para realizar esta operación")
                elif response.status == 404:
                    raise EnerbitAPIError("Recurso no encontrado")
                elif response.status == 422:
                    raise EnerbitAPIError(f"Error de validación: {response_text}")
                elif response.status >= 400:
                    raise EnerbitAPIError(f"Error HTTP {response.status}: {response_text}")
                
                # Intentar parsear JSON
                try:
                    return await response.json()
                except json.JSONDecodeError:
                    return {"raw_response": response_text, "status": response.status}
                
        except aiohttp.ClientError as e:
            raise EnerbitAPIError(f"Error de conexión: {str(e)}")
        except Exception as e:
            raise EnerbitAPIError(f"Error inesperado: {str(e)}")

# Crear servidor MCP
mcp = FastMCP("Enerbit Billing API with Auto Auth", dependencies=["aiohttp>=3.8.0"])

@mcp.tool()
async def enerbit_login(username: str, password: str) -> Dict[str, Any]:
    """
    Inicia sesión en Enerbit y obtiene el token JWT
    
    Args:
        username: Nombre de usuario de Enerbit
        password: Contraseña de Enerbit
    
    Returns:
        Dict con información del login y token obtenido
    """
    
    try:
        global _current_jwt_token, _auth_credentials
        
        # Realizar login
        token = await EnerbitAuthManager.login(username, password)
        
        # Guardar token y credenciales para renovación automática
        _current_jwt_token = token
        _auth_credentials = {
            'username': username,
            'password': password
        }
        
        return {
            "success": True,
            "data": {
                "token_preview": f"{token[:20]}...",
                "username": username,
                "login_time": datetime.now().isoformat(),
                "message": "Login exitoso. Token JWT obtenido y configurado."
            },
            "message": "✅ Autenticación exitosa. Ya puedes usar las demás herramientas sin pasar tokens."
        }
        
    except EnerbitAPIError as e:
        return {
            "success": False,
            "error": str(e),
            "data": None
        }

@mcp.tool()
async def check_auth_status() -> Dict[str, Any]:
    """
    Verifica el estado de autenticación actual
    
    Returns:
        Dict con información del estado de autenticación
    """
    
    global _current_jwt_token, _auth_credentials
    
    if not _current_jwt_token:
        return {
            "success": False,
            "data": {
                "authenticated": False,
                "message": "No hay token JWT. Ejecuta 'enerbit_login' primero."
            }
        }
    
    # Probar el token con una petición simple
    try:
        async with EnerbitClient() as client:
            # Intentar una petición simple para verificar el token
            response = await client.request("GET", f"{BASE_URL}/api/invoices", params={"size": 1})
            
            return {
                "success": True,
                "data": {
                    "authenticated": True,
                    "token_preview": f"{_current_jwt_token[:20]}...",
                    "username": _auth_credentials.get('username') if _auth_credentials else "N/A",
                    "token_valid": True,
                    "message": "Token JWT válido y funcional"
                }
            }
            
    except EnerbitAPIError as e:
        return {
            "success": False,
            "data": {
                "authenticated": True,
                "token_preview": f"{_current_jwt_token[:20]}...",
                "username": _auth_credentials.get('username') if _auth_credentials else "N/A",
                "token_valid": False,
                "error": str(e),
                "message": "Token JWT existe pero no es válido. Ejecuta 'enerbit_login' nuevamente."
            }
        }

@mcp.tool()
async def search_invoices(
    page: int = 1,
    size: int = 10,
    customer_id: Optional[str] = None,
    service_id: Optional[str] = None,
    status: Optional[str] = None,
    invoice_number: Optional[str] = None,
    date_from: Optional[str] = None,
    date_to: Optional[str] = None,
    sort_by: str = "created_at",
    sort_order: str = "desc"
) -> Dict[str, Any]:
    """
    Busca facturas en la API de Enerbit (requiere autenticación previa)
    
    Args:
        page: Número de página para paginación (default: 1)
        size: Número de elementos por página (default: 10, máximo: 100)
        customer_id: Filtrar por ID del cliente
        service_id: Filtrar por ID del servicio
        status: Filtrar por estado (draft, sent, paid, overdue, cancelled, void)
        invoice_number: Buscar por número de factura específico
        date_from: Fecha de inicio (formato: YYYY-MM-DD)
        date_to: Fecha de fin (formato: YYYY-MM-DD)
        sort_by: Campo para ordenar (created_at, updated_at, due_date, total)
        sort_order: Orden de clasificación (asc, desc)
    
    Returns:
        Dict con lista de facturas y metadatos de paginación
    """
    
    try:
        params = {
            "page": page,
            "size": min(size, 100),
            "sort_by": sort_by,
            "sort_order": sort_order
        }
        
        # Agregar filtros opcionales
        if customer_id:
            params["customer_id"] = customer_id
        if service_id:
            params["service_id"] = service_id
        if status:
            params["status"] = status
        if invoice_number:
            params["invoice_number"] = invoice_number
        if date_from:
            params["date_from"] = date_from
        if date_to:
            params["date_to"] = date_to
        
        async with EnerbitClient() as client:
            response = await client.request(
                "GET", 
                f"{BASE_URL}/api/invoices",
                params=params
            )
            
            return {
                "success": True,
                "data": response,
                "message": f"Encontradas {len(response.get('items', []))} facturas"
            }
            
    except EnerbitAPIError as e:
        return {
            "success": False,
            "error": str(e),
            "data": None
        }

# Prompts útiles
@mcp.prompt()
def enerbit_getting_started() -> str:
    """Guía de inicio rápido para usar el MCP de Enerbit"""
    return """
# 🚀 Guía de inicio rápido - Enerbit MCP

## 1. Autenticación (REQUERIDA PRIMERO)
Antes de usar cualquier herramienta, debes autenticarte:

**Comando:** `enerbit_login`
- username: tu_usuario_enerbit
- password: tu_contraseña_enerbit

## 2. Verificar autenticación
**Comando:** `check_auth_status`

## 3. Herramientas disponibles después del login:
- `search_invoices` - Buscar facturas
- `get_invoice_by_id` - Obtener factura específica
- `create_invoice` - Crear nueva factura
- `update_invoice_status` - Cambiar estado
- `send_invoice_email` - Enviar por email
- `get_invoice_pdf` - Descargar PDF
- `get_invoice_statistics` - Ver estadísticas
- `delete_invoice` - Eliminar factura

## 4. Ejemplos de uso:
- "Inicia sesión en Enerbit con usuario 'mi_usuario' y contraseña 'mi_password'"
- "Busca las últimas 10 facturas con estado 'sent'"
- "Crea una factura para el cliente ABC123"
- "¿Cuáles son las estadísticas del último mes?"

¡La autenticación se maneja automáticamente después del login inicial!
    """

if __name__ == "__main__":
    logger.info("Iniciando servidor MCP de Enerbit con autenticación automática")
    mcp.run()
