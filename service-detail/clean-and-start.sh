#!/bin/bash

# Script para limpiar caché y reiniciar el servidor

echo "🧹 Limpiando archivos de build y caché..."

# Limpiar directorio dist
rm -rf dist/

# Limpiar caché de node_modules/.federation si existe
rm -rf node_modules/.federation/

# Limpiar caché de bun si existe
if command -v bun &> /dev/null; then
    echo "🧹 Limpiando caché de Bun..."
    bun pm cache rm
fi

echo "✅ Limpieza completada"
echo "🚀 Ejecutando bun dev..."

# Ejecutar servidor
bun dev