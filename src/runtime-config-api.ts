import getRuntimeConfig from './lib/get-runtime-config';

const runtimeConfig = getRuntimeConfig();

export const runtimeConfigApi = async () => {
    const config = await runtimeConfig;
    return Response.json(config);
}