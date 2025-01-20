import { ReactNode, useReducer } from "react";
import { StoreContext } from "./store-context";
import { initialState, storeReducer } from "./store-reducer";

const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
