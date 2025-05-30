# Service Detail App

This is a remote application that exposes service detail functionality through Module Federation.

## Overview

This application is consumed by the host app and provides service detail views and functionality.

## Port

This application runs on port **3005**.

## Exposed Modules

- `./AppRoutes` - Main routes for the service detail application

## Development

```bash
# Install dependencies
bun install

# Run development server
bun dev

# Build for production
bun build
```

## Integration

To integrate this remote into the host app, add the following to the host's `rsbuild.config.ts`:

```typescript
remotes: {
  // ...other remotes
  serviceDetailApp: "serviceDetailApp@http://localhost:3005/remoteEntry.js",
}
```
