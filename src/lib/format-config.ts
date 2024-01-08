
type ConfigItemEl = string | boolean | number | null | undefined;

type ConfigItem = {[key: string]: ConfigItem} | ConfigItem[] | ConfigItemEl;

export type Config = {
    [key: string]: ConfigItem;
}

const injectEnvs = (part: ConfigItem): ConfigItem => {
    if (typeof part === 'string') {
        return process.env[part];
    }

    if (Array.isArray(part)) {
        return part.map(injectEnvs);
    }

    if (part && typeof part === 'object') {
        const newPart: ConfigItem = {};
        Object.entries(part).map(([key, value]) => (
            newPart[key] = injectEnvs(value)
        ));
        return newPart;
    }

    throw new Error(`Invalid value in envs config: ${part}`)
}

export const injectEnvsToConfig = (config: Config) => {
    const newConfig: Config = {};

    Object.entries(config).map(([key, value]) => {
        newConfig[key] = injectEnvs(value);
    })

    return newConfig;
}

const isNestedPart = (part: ConfigItem): part is Record<string, ConfigItem> => {
    return !!part && !Array.isArray(part) && typeof part === 'object';
}

const formatParts = (key: string, parts: ConfigItem[]) => {
    return parts.reduce<Exclude<ConfigItem, undefined>[]>((acc, part) => {
        if (isNestedPart(part)) {
            if (key in part) {
                const subpart = part[key as keyof typeof part];
                if (subpart !== undefined) {
                    acc.push(subpart);
                }
            }
        }
        return acc;
    }, [])
}

export const mergeConfigs = async (baseConfig: Config, configs: Config[]) => {
    const mergePart = (basePart: ConfigItem, rewritingParts: Exclude<ConfigItem, undefined>[]): ConfigItem => {
        if (isNestedPart(basePart)) {
            const newPart: ConfigItem = {};
            Object.entries(basePart).map(([key, value]) => (
                newPart[key] = mergePart(value, formatParts(key, rewritingParts))
            ));
            return newPart;
        }

        const rewritingPart = rewritingParts[rewritingParts.length - 1];

        if (rewritingPart === undefined) return basePart;

        if (rewritingPart === null) return null;

        if (typeof rewritingPart !== typeof basePart || (typeof rewritingPart === 'object' && !Array.isArray(rewritingPart))) {
            throw new Error('Invalid Scheme');
        }

        return rewritingPart;
    }
    
    return mergePart(baseConfig, configs)
}
