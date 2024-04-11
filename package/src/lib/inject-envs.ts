import type { EnvConfig, EnvConfigItem } from "./types";

const injectEnvs = (part: EnvConfigItem): EnvConfigItem => {
    if (typeof part === "string") {
        return process.env[part];
    }

    if (Array.isArray(part)) {
        return part.map(injectEnvs);
    }

    if (part && typeof part === "object") {
        const newPart: EnvConfigItem = {};
        Object.entries(part).map(([key, value]) => (newPart[key] = injectEnvs(value)));
        return newPart;
    }

    throw new Error(`Invalid value in envs config: ${part}`);
};

export const injectEnvsToConfig = (config: EnvConfig) => {
    const newConfig: EnvConfig = {};

    Object.entries(config).map(([key, value]) => {
        newConfig[key] = injectEnvs(value);
    });

    return newConfig;
};
