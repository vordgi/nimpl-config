import getConfig from "./get-config";

const getPostbuildConfig = async (envs: string[], configFolder?: string) => {
    const configsEntries = await Promise.all(
        envs.map((env) => getConfig({ variant: 'postbuild', env, configFolder }).then(config => [env, config]))
    )
    return Object.fromEntries(configsEntries);
}

export default getPostbuildConfig;
