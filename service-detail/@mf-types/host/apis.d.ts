
    export type RemoteKeys = 'host/brandingStore' | 'host/Layout';
    type PackageType<T> = T extends 'host/Layout' ? typeof import('host/Layout') :T extends 'host/brandingStore' ? typeof import('host/brandingStore') :any;