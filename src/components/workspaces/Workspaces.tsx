import { Component, Show, createEffect, createSignal } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { WorkspaceComponent } from "./WorkspaceComponent";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { WorkspaceTabBar } from "./WorkspaceTabBar";

export const Workspaces: Component<ClassProps> = (props_) => {
  const { classes } = setupClassProps(props_);

  const { getWorkspace, getWorkspaces } = useLopiStoreContext();

  const [currentWorkspaceId, setCurrentWorkspaceId] = createSignal<
    string | null
  >(null);
  const maybeCurrentWorkspace = () => {
    const currentId = currentWorkspaceId();
    return (currentId && getWorkspace(currentId)) || null;
  };

  createEffect(() => {
    const availableId = getWorkspaces()[0]?.id;
    if (!currentWorkspaceId() && availableId) {
      setCurrentWorkspaceId(availableId);
    }
  });

  /*
  const workspaceViews = () =>
    getViews().filter((view) => {
      const currentWorkspace = maybeCurrentWorkspace();
      if (currentWorkspace) {
        return currentWorkspace.viewIds.some((viewId) => viewId === view.id);
      } else {
        return false;
      }
    });
    */

  return (
    <div class="flex flex-col" classList={classes}>
      <WorkspaceTabBar
        currentWorkspaceId={currentWorkspaceId()}
        setCurrentWorkspaceId={setCurrentWorkspaceId}
      />
      <div class="grow min-h-0">
        <Show when={maybeCurrentWorkspace()}>
          {(currentWorkspace) => (
            <WorkspaceComponent
              workspace={currentWorkspace()}
              setWorkspace={(workspace) => {
                console.log(workspace);
              }}
              // views={workspaceViews()}
            />
          )}
        </Show>
      </div>
    </div>
  );
};
