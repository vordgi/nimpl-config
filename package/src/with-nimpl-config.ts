import configurePackageTypes from "./lib/configure-package-types";
import getBuildConfig from "./lib/get-build-config";
import getPostbuildConfig from "./lib/get-postbuild-config";

type NimplConfigParam = {
    envs?: string[];
    targetEnv?: string;
    folder?: string;
}

const nimplConfig = ({ envs = [], targetEnv, folder }: NimplConfigParam) => {
    if (targetEnv && !envs.includes(targetEnv)) {
        console.log(`@nimpl/config: an unknown env was passed (${targetEnv}), the allowed ones were: [${envs.join(', ')}]`);
    }

    configurePackageTypes(folder || 'config');

    return async (nextConfig: any) => {
        if (!nextConfig) nextConfig = {};
        if (!nextConfig.env) nextConfig.env = {};

        const NIMPL_CONFIG_BUILD = await getBuildConfig(folder);
        const NIMPL_CONFIG_POSTBUILD = await getPostbuildConfig(envs, folder);
        nextConfig.env.NIMPL_CONFIG_BUILD = JSON.stringify(NIMPL_CONFIG_BUILD);
        nextConfig.env.NIMPL_CONFIG_POSTBUILD = JSON.stringify(NIMPL_CONFIG_POSTBUILD);
        if (folder) {
            nextConfig.env.NIMPL_CONFIG_FOLDER = folder;
        }
        if (targetEnv) {
            nextConfig.env.NIMPL_CONFIG_ENV = targetEnv;
        }
        return nextConfig;
    }
}

export default nimplConfig;
