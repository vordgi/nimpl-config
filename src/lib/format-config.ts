import type { Config, ConfigItem } from "./types";

const isMergeablePart = (part: ConfigItem): part is Record<string, ConfigItem> => {
    return Boolean(part) && typeof part === 'object' && !Array.isArray(part);
}

const mergeParts = (basePart: ConfigItem, parts: ConfigItem[], subKey?: string) => {
    if (isMergeablePart(basePart)) {
        const newPart: { [key: string]: ConfigItem } = {};
        Object.entries(basePart).forEach(([key, value]) => {
            const existedParts = parts.reduce<ConfigItem[]>((acc, cur) => {
                if (isMergeablePart(cur)) {
                    if (cur[key] !== undefined) {
                        acc.push(cur[key]);
                    }
                } else {
                    throw new Error(`Different type for "${subKey}". Should be: object; got: ${Array.isArray(cur) ? 'Array' : typeof cur}`);
                }
                return acc;
            }, []);
            newPart[key] = mergeParts(value, existedParts, `${subKey ? `${subKey}.` : ''}${key}`);
        }, [])

        return newPart;
    }

    const lastExistedPart = parts.findLast(part => part !== undefined);

    if (lastExistedPart) {
        if (Array.isArray(basePart) && !Array.isArray(lastExistedPart)) {
            throw new Error(`Different type for "${subKey}". Should be: Array; got: ${typeof lastExistedPart}`);
        }
        if (lastExistedPart !== null && typeof basePart !== typeof lastExistedPart) {
            throw new Error(`Different type for "${subKey}". Should be: ${typeof basePart}; got: ${typeof lastExistedPart}`);
        }
        return lastExistedPart;
    }

    return lastExistedPart || basePart;
}

export const mergeConfigs = async (baseConfig: Config, configs: Config[]) => {
    return mergeParts(baseConfig, configs);
}
