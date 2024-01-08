# next-impl-config

The package allows for convenient management of application configuration in Next.js environments.

## Motivation

For the config, Next.js only offers environment variables - regular ones for the server, and ones with NEXT_PUBLIC prefix, which will be embedded during the build process.

And here are a few downsides:

- It's not convenient for large configuration objects.
- It doesn't cover all use cases, such as runtime config and react runtime config (when the image is built once and used in different environments).

On the other hand, next-impl-config offers support for 4 different configuration options for your applications.

## Installation

**Using npm:**
```bash
npm i next-impl-config
```

**Using yarn:**
```bash
yarn add next-impl-config
```

## Structure

All configs are stored in the config directory. Each variant is stored independently in a subdirectory with the same name.

config

- server
- build
- postbuild
- runtime

All types support the following config variants:

- default.js
- default.local.js
- [PROCESS_ENV].js
- [PROCESS_ENV].local.js
- envs.js
- envs.local.js

The lower the config variant is in the list, the higher its priority.

- default.js: Used as the default value, all config keys should be filled in this file.
- [PROCESS_ENV].js: Environment-dependent config.
- envs.js: Config with environment variables as values.
- .local.js versions: Local versions that should be added to gitignore.

## Types

### server

The config is generated at runtime (based on the environment conditions at runtime).

Recommended for API routes or in force-dynamic mode in server components.

```jsx
import { serverConfig } from 'next-impl-config/server-config';
// ...
const config = await serverConfig;
```

### build

The config is generated at build time (based on the environment conditions at build time).

Recommended for components that don't depend on the runtime environment.

```jsx
import { buildConfig } from 'next-impl-config/build-config';
// ...
const config = buildConfig;
```

### postbuild

During the build process, configs are generated for each possible environment (based on the environment conditions at build time). Then, at runtime, the appropriate version is selected.

Recommended for middleware.

```jsx
import { postbuildConfig } from 'next-impl-config/postbuild-config';
// ...
const config = postbuildConfig;
```

### runtime

An API route is created that generates the config at the time of the request (based on the environment conditions at runtime). Then, on the client side, a provider is initialized that loads the config and returns it after loading (triggering a re-render).

Recommended for components that depend on the runtime environment.

```jsx
'client';

import useRuntimeConfig from 'next-impl-config/use-runtime-config';
// ...
const config = useRuntimeConfig();

if (!config) return <p>Loading...</p>
// ...
```

## Configuration

### server

This type doesn't require any additional configuration.

### build

Next.js config needs to be wrapped with withNextConfig.

```jsx
/// next.config.js
const withNextConfig = require('next-impl-config/with-next-config').default;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ...
};

module.exports = withNextConfig()(nextConfig);
```

### postbuild

Possible environments need to be passed to withNextConfig.

```jsx
/// next.config.js
const withNextConfig = require('next-impl-config/with-next-config').default;

/** @type {import('next').NextConfig} */
const nextConfig = {
    // ...
};

module.exports = withNextConfig(['development', 'staging', 'production'])(nextConfig);
```

### runtime

First, create an API route.

```jsx
/// app/api/config/route.tsx
export { runtimeConfigApi as GET } from 'next-impl-config/runtime-config-api';
```

Wrap the application with the Provider.

```jsx
/// app/layout.tsx
import RuntimeConfigProvider from 'next-impl-config/runtime-config-provider';

export default function RootLayout() {
  return (
    <RuntimeConfigProvider apiPath='/api/config'>
      // ...
    </RuntimeConfigProvider>
  );
}
```

## License

[MIT](https://github.com/vordgi/next-impl-config/blob/main/LICENSE)
