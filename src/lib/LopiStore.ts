import { createUniqueId } from "./createUniqueId";
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
      const newWorkspace: Workspace = {
        id: createUniqueId("workspace"),
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
    setWorkspace: (id: string, updateObject: Partial<Workspace>) => {
      setStore("workspaces", (workspace) => workspace.id === id, updateObject);
    },
    getViews: () => {
      return store.views;
    },
    addView: () => {
      const newView: View = {
        id: createUniqueId("view"),
        editorId: "",
      };
      setStore("views", store.views.length, newView);
      return newView.id;
    },
    setView: (id: string, updateObject: Partial<View>) => {
      setStore("views", (view) => view.id === id, updateObject);
    },
  };
};

export type LopiStore = ReturnType<typeof createLopiStore>;
