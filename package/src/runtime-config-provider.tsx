"use client";

import React, { useRef } from "react";
import type { Config } from "./lib/types";
import { RuntimeConfigContext } from "./lib/runtime-config-context";

const RuntimeConfigProvider: React.FC<{ children: React.ReactNode; apiPath: string }> = ({ children, apiPath }) => {
    const [config, setConfig] = React.useState<Config | null>(null);
    const isLoadingRef = useRef(false);

    React.useEffect(() => {
        if (!isLoadingRef.current) {
            isLoadingRef.current = true;
            fetch(apiPath)
                .then((resp) => resp.json())
                .then((data) => setConfig(data));
        }
    }, []);

    return <RuntimeConfigContext.Provider value={config}>{children}</RuntimeConfigContext.Provider>;
};

export default RuntimeConfigProvider;
