# React Module Federation Example

This is a monorepo example of Module Federation using React, Rspack, and Bun. It consists of a host application that consumes multiple remote applications.

## Project Structure

- `host-app/` - Main application that consumes the remote modules
- `login-app/` - Remote application that exposes the login functionality
- `home-app/` - Remote application that exposes home functionality
- `service-detail/` - Remote application that exposes service detail functionality

## Prerequisites

- [Bun](https://bun.sh) v1.2.4 or higher
- Node.js 16+

## Getting Started

1. Install dependencies in all applications:

```bash
# From the root directory, install all dependencies
bun run install:all
```

Or install manually:

```bash
# Root directory
bun install

# Host app
cd host-app
bun install

# Login app
cd ../login-app
bun install

# Home app
cd ../home-app
bun install

# Service Detail app
cd ../service-detail
bun install
```

## Running All Applications

You can start all applications at once:

```bash
# Using npm script
bun run dev:all
```

Or using the shell script directly:

```bash
# Make the script executable (first time only)
chmod +x start-all.sh

# Run all applications
./start-all.sh
```

Alternatively, run each application individually in separate terminals:

```bash
# Terminal 1 - Host App
cd host-app && bun dev

# Terminal 2 - Login App
cd login-app && bun dev

# Terminal 3 - Home App
cd home-app && bun dev

# Terminal 4 - Service Detail App
cd service-detail && bun dev
```

## Application URLs

- Host App: http://localhost:3000
- Login App: http://localhost:3001 (standalone)
- Home App: http://localhost:3003 (standalone)
- Service Detail App: http://localhost:3005 (standalone)

## Routes in Host App

- `/` - Login page (from login-app)
- `/home/*` - Home pages (from home-app)
- `/services/*` - Service detail pages (from service-detail)

## Module Federation Configuration

Each remote application exposes specific modules that can be consumed by the host:

### Login App
- `./LoginPage` - Login page component
- `./loadLoginCss` - Login-specific styles

### Home App
- `./AppRoutes` - Home application routes

### Service Detail App
- `./AppRoutes` - Service detail application routes

### Host App Exposes
- `./brandingStore` - Global branding state
- `./Layout` - Shared layout component
- `./apiClient` - Shared API client
- `./token` - Token utilities
- `./localStorage` - Local storage utilities

## Development Notes

- All applications share React, React DOM, React Router, and Zustand as singleton dependencies
- The host application manages authentication and routing
- Remote applications can access shared modules from the host
- Each remote runs independently and can be developed in isolation
