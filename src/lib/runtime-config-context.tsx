import React from "react";
import type { Config } from "./format-config";

export const RuntimeConfigContext = React.createContext<Config | null>(null);
