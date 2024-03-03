import React from "react";
import type { Config } from "./types";

export const RuntimeConfigContext = React.createContext<Config | null>(null);
