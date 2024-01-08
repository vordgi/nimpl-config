import { useContext } from "react";
import type { Config } from "./lib/format-config";
import { RuntimeConfigContext } from "./lib/runtime-config-context";

const useRuntimeConfig = (): Config | null => {
    const configData = useContext(RuntimeConfigContext);

    return configData;
}

export default useRuntimeConfig;
