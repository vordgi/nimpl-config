// NOTE: This file should not be edited
// see https://github.com/vordgi/next-impl-config#typescript for more information.

declare module "@nimpl/config/use-runtime-config" {
    declare const useRuntimeConfig: () => typeof import('./cong/runtime/default');
    export default useRuntimeConfig;
}

declare module "@nimpl/config/build-config" {
    export declare const buildConfig: typeof import('./cong/build/default');
}

declare module "@nimpl/config/postbuild-config" {
    export declare const postbuildConfig: typeof import('./cong/postbuild/default');
}

declare module "@nimpl/config/server-config" {
    export declare const serverConfig: Promise<typeof import('./cong/server/default')>;
}
