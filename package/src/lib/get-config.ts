import { mergeConfigs } from "./format-config";
import { injectEnvsToConfig } from "./inject-envs";
import { findConfigs, getConfigVariantFolder, loadConfig } from "./utils";

type GetConfigParam = {
    variant: "build" | "postbuild" | "server" | "runtime";
    env?: string;
    configFolder?: string;
};

const getConfig = async ({ variant, env, configFolder }: GetConfigParam) => {
    const variantFolder = getConfigVariantFolder(variant, configFolder);
    const configs = await findConfigs(variantFolder, env || process.env.NIMPL_CONFIG_ENV || process.env.NODE_ENV);

    if (!configs) return null;

    const [defaultConfig, ...otherConfigs] = await Promise.all([
        loadConfig(configs.defaultBase),
        configs.defaultLocal && loadConfig(configs.defaultLocal),
        configs.processBase && loadConfig(configs.processBase),
        configs.processLocal && loadConfig(configs.processLocal),
        configs.envsBase && loadConfig(configs.envsBase).then(injectEnvsToConfig),
        configs.envsLocal && loadConfig(configs.envsLocal).then(injectEnvsToConfig),
    ]);

    const config = await mergeConfigs(defaultConfig, otherConfigs.filter(Boolean));
    return config;
};

export default getConfig;
