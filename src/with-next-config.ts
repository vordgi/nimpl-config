import getBuildConfig from "./lib/get-build-config";
import getPostbuildConfig from "./lib/get-postbuild-config";

const withNextConfig = (envs: string[] = []) => {
    return async (nextConfig: any) => {
        if (!nextConfig) nextConfig = {};
        if (!nextConfig.env) nextConfig.env = {};

        const NEXT_CONFIG_BUILD = await getBuildConfig();
        const NEXT_CONFIG_POSTBUILD = await getPostbuildConfig(envs);
        nextConfig.env.NEXT_CONFIG_BUILD = JSON.stringify(NEXT_CONFIG_BUILD);
        nextConfig.env.NEXT_CONFIG_POSTBUILD = JSON.stringify(NEXT_CONFIG_POSTBUILD);
        return nextConfig;
    }
}

export default withNextConfig;
