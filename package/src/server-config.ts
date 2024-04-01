import getServerConfig from "./lib/get-server-config";

export const serverConfig = getServerConfig(process.env.NIMPL_CONFIG_FOLDER);
