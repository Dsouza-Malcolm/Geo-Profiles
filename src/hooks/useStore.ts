import { StoreContext } from "@/store/store-context";
import { useContext } from "react";

export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }

  return context;
};
