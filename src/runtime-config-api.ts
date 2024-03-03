import getRuntimeConfig from './lib/get-runtime-config';

const runtimeConfig = getRuntimeConfig(process.env.NEXT_IMPL_CONFIG_FOLDER);

export const runtimeConfigApi = async () => {
    const config = await runtimeConfig;
    return Response.json(config);
}