import getServerConfig from "./lib/get-server-config";

export const serverConfig = getServerConfig(process.env.NEXT_IMPL_CONFIG_FOLDER);
