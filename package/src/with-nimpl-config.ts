import configurePackageTypes from "./lib/configure-package-types";
import getBuildConfig from "./lib/get-build-config";
import getPostbuildConfig from "./lib/get-postbuild-config";

type NimplConfigParam = {
    /** List of possible environment variables */
    envs?: string[];
    /** The current environment variable that will be used for [Environment-dependent config](https://nimpl.tech/config/configuration#environment-dependent-config) */
    targetEnv?: string;
    /** The key of the environment variable that needs to be used for [Environment-dependent config](https://nimpl.tech/config/configuration#environment-dependent-config) */
    targetEnvKey?: string;
    /** Path to the directory with configs */
    folder?: string;
};

const nimplConfig = ({ envs = [], targetEnv, targetEnvKey, folder }: NimplConfigParam) => {
    if (targetEnv && !envs.includes(targetEnv)) {
        console.log(
            `@nimpl/config: an unknown env was passed (${targetEnv}), the allowed ones were: [${envs.join(", ")}]`,
        );
    }
    if (targetEnvKey && (!process.env[targetEnvKey] || !envs.includes(process.env[targetEnvKey]))) {
        console.log(
            `@nimpl/config: Failed to get the allowed env by the targetEnvKey (process.env["${targetEnvKey}"]=${process.env[targetEnvKey]}), the allowed ones were: [${envs.join(", ")}]`,
        );
    }

    configurePackageTypes(folder || "config");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        if (targetEnvKey) {
            nextConfig.env.NIMPL_CONFIG_ENV_KEY = targetEnvKey;
        }
        return nextConfig;
    };
};

export default nimplConfig;
