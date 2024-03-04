// NOTE: This file should not be edited
// see https://github.com/vordgi/next-impl-config#typescript for more information.

declare module "next-impl-config/use-runtime-config" {
    declare const useRuntimeConfig: () => typeof import('./cong/runtime/default');
    export default useRuntimeConfig;
}

declare module "next-impl-config/build-config" {
    export declare const buildConfig: typeof import('./cong/build/default');
}

declare module "next-impl-config/postbuild-config" {
    export declare const postbuildConfig: typeof import('./cong/postbuild/default');
}

declare module "next-impl-config/server-config" {
    export declare const serverConfig: Promise<typeof import('./cong/server/default')>;
}
