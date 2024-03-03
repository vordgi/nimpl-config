import configurePackageTypes from "./lib/configure-package-types";
import getBuildConfig from "./lib/get-build-config";
import getPostbuildConfig from "./lib/get-postbuild-config";

type NextImplConfigParam = {
    envs?: string[];
    targetEnv?: string;
    folder?: string;
}

const nextImplConfig = ({ envs = [], targetEnv, folder }: NextImplConfigParam) => {
    if (targetEnv && !envs.includes(targetEnv)) {
        console.log(`next-impl-config: an unknown env was passed (${targetEnv}), the allowed ones were: [${envs.join(', ')}]`);
    }

    configurePackageTypes(folder || 'config');

    return async (nextConfig: any) => {
        if (!nextConfig) nextConfig = {};
        if (!nextConfig.env) nextConfig.env = {};

        const NEXT_CONFIG_BUILD = await getBuildConfig(folder);
        const NEXT_CONFIG_POSTBUILD = await getPostbuildConfig(envs, folder);
        nextConfig.env.NEXT_CONFIG_BUILD = JSON.stringify(NEXT_CONFIG_BUILD);
        nextConfig.env.NEXT_CONFIG_POSTBUILD = JSON.stringify(NEXT_CONFIG_POSTBUILD);
        if (folder) {
            nextConfig.env.NEXT_IMPL_CONFIG_FOLDER = folder;
        }
        if (targetEnv) {
            nextConfig.env.NEXT_IMPL_CONFIG_ENV = targetEnv;
        }
        return nextConfig;
    }
}

export default nextImplConfig;
