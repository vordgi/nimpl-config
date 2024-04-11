import getRuntimeConfig from "./lib/get-runtime-config";

const runtimeConfig = getRuntimeConfig(process.env.NIMPL_CONFIG_FOLDER);

export const runtimeConfigApi = async () => {
    const config = await runtimeConfig;
    return Response.json(config);
};
