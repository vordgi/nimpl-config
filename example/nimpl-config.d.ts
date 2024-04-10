// NOTE: This file should not be edited
// see https://nimpl.tech/config/configuration#typescript for more information.

declare module "@nimpl/config/use-runtime-config" {
    declare const useRuntimeConfig: () => typeof import('./config/runtime/default');
    export default useRuntimeConfig;
}

declare module "@nimpl/config/build-config" {
    export declare const buildConfig: typeof import('./config/build/default');
}

declare module "@nimpl/config/postbuild-config" {
    export declare const postbuildConfig: typeof import('./config/postbuild/default');
}

declare module "@nimpl/config/server-config" {
    export declare const serverConfig: Promise<typeof import('./config/server/default')>;
}
