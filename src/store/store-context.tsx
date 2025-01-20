import { createContext } from "react";
import { StoreContextType } from "../types/types";

export const StoreContext = createContext<StoreContextType | undefined>(
  undefined
);
