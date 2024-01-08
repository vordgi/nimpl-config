import getConfig from "./get-config";

const getPostbuildConfig = async (envs: string[]) => {
    const configsEntries = await Promise.all(
        envs.map((env) => getConfig('postbuild', env).then(config => [env, config]))
    )
    return Object.fromEntries(configsEntries);
}

export default getPostbuildConfig;
