import getBuildConfig from "./lib/get-build-config";
import getPostbuildConfig from "./lib/get-postbuild-config";
import { existsSync, writeFileSync } from 'fs';
import path from 'path';

const configDeclarationsPath = path.join(process.cwd(), 'next-impl-config.d.ts');
const template = `// NOTE: This file should not be edited
// see https://github.com/vordgi/next-impl-config#typescript for more information.

declare module "next-impl-config/use-runtime-config" {
    declare const useRuntimeConfig: () => typeof import('./config/runtime/default');
    export default useRuntimeConfig;
}

declare module "next-impl-config/build-config" {
    export declare const buildConfig: typeof import('./config/build/default');
}

declare module "next-impl-config/postbuild-config" {
    export declare const postbuildConfig: typeof import('./config/postbuild/default');
}

declare module "next-impl-config/server-config" {
    export declare const serverConfig: Promise<typeof import('./config/server/default')>;
}
`

const withNextConfig = (envs: string[] = [], targetEnv?: string) => {
    if (targetEnv && !envs.includes(targetEnv)) {
        console.log(`next-impl-config: an unknown env was passed (${targetEnv}), the allowed ones were: [${envs.join(', ')}]`);
    }
    if (!existsSync(configDeclarationsPath)) {
        console.log(`next-impl-config: next-impl-config.d.ts file with configs types was generated`);
        writeFileSync(configDeclarationsPath, template);
    }

    return async (nextConfig: any) => {
        if (!nextConfig) nextConfig = {};
        if (!nextConfig.env) nextConfig.env = {};

        const NEXT_CONFIG_BUILD = await getBuildConfig();
        const NEXT_CONFIG_POSTBUILD = await getPostbuildConfig(envs);
        nextConfig.env.NEXT_CONFIG_BUILD = JSON.stringify(NEXT_CONFIG_BUILD);
        nextConfig.env.NEXT_CONFIG_POSTBUILD = JSON.stringify(NEXT_CONFIG_POSTBUILD);
        if (targetEnv) {
            nextConfig.env.NEXT_IMPL_CONFIG_ENV = targetEnv;
        }
        return nextConfig;
    }
}

export default withNextConfig;
