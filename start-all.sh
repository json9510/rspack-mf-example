#!/bin/bash

# Script para iniciar todas las aplicaciones del proyecto Module Federation

echo "🚀 Starting Module Federation Applications..."

# Función para iniciar una aplicación en una nueva terminal
start_app() {
    local app_name=$1
    local app_path=$2
    
    echo "Starting $app_name..."
    
    # Detectar el sistema operativo y abrir terminal correspondiente
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        osascript -e "tell app \"Terminal\" to do script \"cd $app_path && bun dev\""
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        gnome-terminal -- bash -c "cd $app_path && bun dev; exec bash"
    else
        # Windows (Git Bash)
        start "" cmd /c "cd $app_path && bun dev"
    fi
}

# Obtener el directorio actual
CURRENT_DIR=$(pwd)

# Iniciar cada aplicación
start_app "Host App (Port 3000)" "$CURRENT_DIR/host-app"
sleep 2
start_app "Login App (Port 3001)" "$CURRENT_DIR/login-app"
sleep 2
start_app "Home App (Port 3003)" "$CURRENT_DIR/home-app"
sleep 2
start_app "Service Detail App (Port 3005)" "$CURRENT_DIR/service-detail"

echo "✅ All applications should be starting..."
echo ""
echo "📌 Applications running on:"
echo "   - Host App: http://localhost:3000"
echo "   - Login App: http://localhost:3001"
echo "   - Home App: http://localhost:3003"
echo "   - Service Detail App: http://localhost:3005"
echo ""
echo "Press Ctrl+C to stop this script (terminals will remain open)"
