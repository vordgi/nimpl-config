const configs: {[key: string]: any} | undefined = process.env.NIMPL_CONFIG_POSTBUILD && JSON.parse(process.env.NIMPL_CONFIG_POSTBUILD);

export const postbuildConfig = process.env.NODE_ENV && configs?.[process.env.NODE_ENV] || null;
