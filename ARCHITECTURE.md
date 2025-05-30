# Module Federation Architecture

## Visual Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        HOST-APP (3000)                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Shared Modules                     │   │
│  │  - brandingStore    - Layout      - apiClient       │   │
│  │  - token           - localStorage                    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  Routes:                                                     │
│  - /          → LoginApp                                    │
│  - /home/*    → HomeApp                                     │
│  - /services/* → ServiceDetailApp                           │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┬─────────────────┐
        │              │              │                 │
        ▼              ▼              ▼                 ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│  LOGIN-APP    │ │   HOME-APP    │ │SERVICE-DETAIL │ │   OVERVIEW    │
│    (3001)     │ │    (3003)     │ │    (3005)     │ │    (3004)     │
├───────────────┤ ├───────────────┤ ├───────────────┤ ├───────────────┤
│ Exposes:      │ │ Exposes:      │ │ Exposes:      │ │ Exposes:      │
│ - LoginPage   │ │ - AppRoutes   │ │ - AppRoutes   │ │ - Overview    │
│ - loadLoginCss│ │               │ │               │ │ - loadOverView│
└───────────────┘ └───────────────┘ └───────────────┘ └───────────────┘
```

## Communication Flow

1. **Host → Remotes**: Host consumes exposed modules from remote apps
2. **Remotes → Host**: Remote apps can import shared modules from host
3. **Shared Dependencies**: React, React-DOM, React-Router, Zustand

## Key Features

- **Dynamic Loading**: Remote modules are loaded on-demand
- **Independent Deployment**: Each app can be deployed separately
- **Shared State**: Using Zustand for cross-app state management
- **Type Safety**: TypeScript support (with @ts-ignore for MF imports)
- **Development Experience**: Each app runs independently in dev mode
