import getConfig from "./get-config";

const getBuildConfig = async (configFolder?: string) => {
    const config = await getConfig({ variant: 'build', configFolder });
    return config;
}

export default getBuildConfig;
