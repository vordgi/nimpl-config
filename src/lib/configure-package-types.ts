import path from 'path';
import { existsSync, writeFileSync } from 'fs';

const configurePackageTypes = (folder: string) => {
    const configDeclarationsPath = path.join(process.cwd(), 'next-impl-config.d.ts');
    const configFolderPath = path.join(process.cwd(), folder);

    if (!existsSync(configFolderPath)) {
        throw new Error('next-impl-config: doesnt exist');
    }

    const configFolderRelativePath = path.relative(process.cwd(), configFolderPath);
    const normalizedRelativePath = './' + configFolderRelativePath.replace(/\/{2,}|\\+/g, '/').replace(/\/$/, '');

    if (!existsSync(configDeclarationsPath)) {
        console.log(`next-impl-config: next-impl-config.d.ts file with configs types was generated`);
        writeFileSync(configDeclarationsPath, `// NOTE: This file should not be edited
// see https://github.com/vordgi/next-impl-config#typescript for more information.

declare module "next-impl-config/use-runtime-config" {
    declare const useRuntimeConfig: () => typeof import('${normalizedRelativePath}/runtime/default');
    export default useRuntimeConfig;
}

declare module "next-impl-config/build-config" {
    export declare const buildConfig: typeof import('${normalizedRelativePath}/build/default');
}

declare module "next-impl-config/postbuild-config" {
    export declare const postbuildConfig: typeof import('${normalizedRelativePath}/postbuild/default');
}

declare module "next-impl-config/server-config" {
    export declare const serverConfig: Promise<typeof import('${normalizedRelativePath}/server/default')>;
}
`);
    }
}

export default configurePackageTypes;
