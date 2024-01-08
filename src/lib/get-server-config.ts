import getConfig from "./get-config";

const getServerConfig = async () => {
    const config = await getConfig('server');
    return config;
}

export default getServerConfig;
