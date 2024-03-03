import getConfig from "./get-config";

const getServerConfig = async (configFolder?: string) => {
    const config = await getConfig({ variant: 'server', configFolder });
    return config;
}

export default getServerConfig;
