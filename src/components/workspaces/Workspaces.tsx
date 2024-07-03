import {
  Component,
  Show,
  createEffect,
  createSignal,
  mergeProps,
} from "solid-js";
import { ClassProps } from "../../lib/utils/ClassProps";
import { WorkspaceComponent } from "./WorkspaceComponent";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { WorkspaceTabBar } from "./WorkspaceTabBar";

export const Workspaces: Component<ClassProps> = (props_) => {
  const props = mergeProps({ class: "", classList: {} }, props_);

  const { getWorkspace, getWorkspaces } = useLopiStoreContext();

  createEffect(() => {
    console.log(getWorkspaces()[0].id);
  });

  const [currentWorkspaceId, setCurrentWorkspaceId] = createSignal<
    string | null
  >(null);
  const maybeCurrentWorkspace = () => {
    const currentId = currentWorkspaceId();
    return (currentId && getWorkspace(currentId)) || null;
  };
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
    <div
      class={["flex flex-col", props.class].join(" ")}
      classList={{ ...props.classList }}
    >
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
