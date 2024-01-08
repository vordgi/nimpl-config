import getConfig from "./get-config";

const getBuildConfig = async () => {
    const config = await getConfig('build');
    return config;
}

export default getBuildConfig;
