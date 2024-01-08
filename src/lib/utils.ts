import path from "path"
import { pathToFileURL } from "url";
import { readdir } from 'fs/promises';

export const getConfigVariantFolder = (variant: string) => {
    return path.join(process.cwd(), 'config', variant);
}

export const findConfigs = async (variantFolder: string, env?: string) => {
    let configs: string[] = [];
    try {
        configs = await readdir(variantFolder);
    } catch {
        return;
    }

    const getFilePath = (base: string) => {
        if (configs.includes(`${base}.js`)) {
            return path.join(variantFolder, `${base}.js`);
        }
        if (configs.includes(`${base}.json`)) {
            return path.join(variantFolder, `${base}.json`);
        }
    }

    const defaultConfig = getFilePath('default');

    if (!defaultConfig) {
        throw new Error('Should exist default config');
    }

    const validConfigs = {
        defaultBase: defaultConfig,
        defaultLocal: getFilePath('default.local'),
        processBase: env && getFilePath(env),
        processLocal: env && getFilePath(`${env}.local`),
        envsBase: getFilePath('envs'),
        envsLocal: getFilePath('envs.local'),
    }

    return validConfigs;
}

const dynamicImport = new Function('p', 'return import(p)');

export const loadConfig = async (path: string) => {
    const config = await dynamicImport(pathToFileURL(path).toString());
    return config.default || config;
}
