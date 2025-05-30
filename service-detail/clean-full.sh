#!/bin/bash

echo "🧹 Limpiando archivos de build y caché..."

# Limpiar directorio dist
rm -rf dist/

# Limpiar caché de node_modules/.federation si existe
rm -rf node_modules/.federation/

# Limpiar node_modules y reinstalar (para resolver conflictos de MUI)
echo "📦 Reinstalando dependencias..."
rm -rf node_modules/
bun install

echo "✅ Limpieza completada"
echo "🚀 Ejecutando bun dev..."

# Ejecutar servidor
bun dev