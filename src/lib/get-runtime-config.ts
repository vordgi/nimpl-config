import getConfig from "./get-config";

const getRuntimeConfig = async () => {
    const config = await getConfig('runtime');
    return config;
}

export default getRuntimeConfig;
