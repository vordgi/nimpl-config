type ConfigItemEl = string | boolean | number | null;

export type ConfigItem = {[key: string]: ConfigItem} | ConfigItem[] | ConfigItemEl;

export type Config = {
    [key: string]: ConfigItem;
}

type EnvConfigItemEl = string | boolean | number | null | undefined;

export type EnvConfigItem = {[key: string]: EnvConfigItem} | EnvConfigItem[] | EnvConfigItemEl;

export type EnvConfig = {
    [key: string]: EnvConfigItem;
}