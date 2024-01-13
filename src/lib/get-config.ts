import { mergeConfigs } from "./format-config";
import { injectEnvsToConfig } from "./inject-envs";
import { findConfigs, getConfigVariantFolder, loadConfig } from "./utils";

const getConfig = async (variant: 'build' | 'postbuild' | 'server' | 'runtime', env?: string) => {
    const variantFolder = getConfigVariantFolder(variant);
    const configs = await findConfigs(variantFolder, env || process.env.NODE_ENV);

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
}

export default getConfig;
