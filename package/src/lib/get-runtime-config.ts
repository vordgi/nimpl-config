import getConfig from "./get-config";

const getRuntimeConfig = async (configFolder?: string) => {
    const config = await getConfig({ variant: "runtime", configFolder });
    return config;
};

export default getRuntimeConfig;
