import { LopiStore, createLopiStore } from "@lib/LopiStore";
import { ParentComponent, createContext, useContext } from "solid-js";

const LopiStoreContext = createContext<LopiStore>();

export const useLopiStoreContext = () => {
  const lopiStoreContext = useContext(LopiStoreContext);
  if (!lopiStoreContext) {
    throw "error";
  }
  return lopiStoreContext;
};

export const LopiStoreProvider: ParentComponent = (props) => {
  const lopiStore = createLopiStore();

  return (
    <LopiStoreContext.Provider value={lopiStore}>
      {props.children}
    </LopiStoreContext.Provider>
  );
};
