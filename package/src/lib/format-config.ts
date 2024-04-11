import type { Config, ConfigItem } from "./types";

const isMergeablePart = (part: ConfigItem): part is Record<string, ConfigItem> => {
    return Boolean(part) && typeof part === "object" && !Array.isArray(part);
};

const mergeParts = async (basePart: ConfigItem, parts: ConfigItem[], subKey?: string): Promise<ConfigItem> => {
    if (isMergeablePart(basePart)) {
        const newPart: { [key: string]: ConfigItem } = {};

        for await (const [key, value] of Object.entries(basePart)) {
            const existedParts = parts.reduce<ConfigItem[]>((acc, cur) => {
                if (isMergeablePart(cur)) {
                    if (cur[key] !== undefined) {
                        acc.push(cur[key]);
                    }
                } else {
                    throw new Error(
                        `Different type for "${subKey}". Should be: object; got: ${Array.isArray(cur) ? "Array" : typeof cur}`,
                    );
                }
                return acc;
            }, []);
            newPart[key] = await mergeParts(value, existedParts, `${subKey ? `${subKey}.` : ""}${key}`);
        }

        return newPart;
    }

    if (typeof basePart === "function") {
        const basePartResult = await basePart();
        const partsResult = await Promise.all(
            parts.map((part) => {
                if (typeof part === "function") {
                    return part();
                } else {
                    throw new Error(`Different type for "${subKey}". Should be: function; got: ${typeof part}`);
                }
            }),
        );
        const newPart = await mergeParts(basePartResult, partsResult, subKey);
        return newPart;
    }

    const lastExistedPart = parts.findLast((part) => part !== undefined);

    if (lastExistedPart) {
        if (Array.isArray(basePart) && !Array.isArray(lastExistedPart)) {
            throw new Error(`Different type for "${subKey}". Should be: Array; got: ${typeof lastExistedPart}`);
        }
        if (lastExistedPart !== null && typeof basePart !== typeof lastExistedPart) {
            throw new Error(
                `Different type for "${subKey}". Should be: ${typeof basePart}; got: ${typeof lastExistedPart}`,
            );
        }
        return lastExistedPart;
    }

    return lastExistedPart || basePart;
};

export const mergeConfigs = async (baseConfig: Config, configs: Config[]) => {
    const result = await mergeParts(baseConfig, configs);
    return result;
};
