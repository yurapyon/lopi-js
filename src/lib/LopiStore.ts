import { createUniqueId } from "solid-js";
import { Editor } from "./editors/Editor";
import { createStore } from "solid-js/store";

export interface Workspace {
  id: string;
  name: string;
  viewIds: string[];
  isSplit: boolean;
}

export interface View {
  id: string;
  editorId: string;
}

export interface LopiStoreAPI {
  workspaces: Workspace[];
  views: View[];
  editors: Editor[];
}

export const createLopiStore = () => {
  const [store, setStore] = createStore<LopiStoreAPI>({
    workspaces: [],
    views: [],
    editors: [],
  });
  return {
    addWorkspace: () => {
      const newWorkspace = {
        id: createUniqueId(),
        name: "",
        viewIds: [],
        isSplit: false,
      };
      setStore("workspaces", store.workspaces.length, newWorkspace);
      return newWorkspace.id;
    },
    removeWorkspace: (id: string) => {
      setStore(
        "workspaces",
        store.workspaces.filter((workspace) => workspace.id !== id)
      );
    },
    getWorkspaces: () => {
      return store.workspaces;
    },
    getWorkspace: (id: string) => {
      return store.workspaces.find((workspace) => workspace.id === id);
    },
  };
};

export type LopiStore = ReturnType<typeof createLopiStore>;
