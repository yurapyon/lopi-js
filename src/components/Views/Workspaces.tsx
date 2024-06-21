import {
  Component,
  For,
  Setter,
  Show,
  createSelector,
  createSignal,
  mergeProps,
} from "solid-js";
import { Button } from "../general-ui/Button";
import { ClassProps } from "../../lib/ClassProps";
import { View, Workspace } from "../../lib/LopiStore";
import { WorkspaceComponent } from "./Workspace";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";

export const Workspaces: Component<
  {
    views: View[];
    setViews: Setter<View[]>;
  } & ClassProps
> = (props_) => {
  const props = mergeProps({ class: "", classList: {} }, props_);

  const { addWorkspace, removeWorkspace, getWorkspaces, getWorkspace } =
    useLopiStoreContext();

  const [currentWorkspaceId, setCurrentWorkspaceId] = createSignal<
    string | null
  >(null);
  const isSelected = createSelector(currentWorkspaceId);
  const maybeCurrentWorkspace = () => {
    const currentId = currentWorkspaceId();
    return (currentId && getWorkspace(currentId)) || null;
  };
  const workspaceViews = () =>
    props.views.filter((view) => {
      const currentWorkspace = maybeCurrentWorkspace();
      if (currentWorkspace) {
        return currentWorkspace.viewIds.some((viewId) => viewId === view.id);
      } else {
        return false;
      }
    });

  return (
    <div
      class={["flex flex-col", props.class].join(" ")}
      classList={{ ...props.classList }}
    >
      <div class="flex flex-row">
        <For each={getWorkspaces()}>
          {(workspace) => {
            return (
              <div>
                <Button
                  class="w-[18ch]"
                  selected={isSelected(workspace.id)}
                  onClick={() => setCurrentWorkspaceId(workspace.id)}
                  variant="light"
                >
                  {workspace.id}
                </Button>
                <Button
                  class="px-[1ch]"
                  selected={isSelected(workspace.id)}
                  onClick={() => removeWorkspace(workspace.id)}
                  variant="light"
                >
                  x
                </Button>
              </div>
            );
          }}
        </For>
        <Button class="px-[1ch]" onClick={addWorkspace}>
          +
        </Button>
      </div>
      <div class="grow min-h-0">
        <Show when={maybeCurrentWorkspace()}>
          {(currentWorkspace) => (
            <WorkspaceComponent
              workspace={currentWorkspace()}
              setWorkspace={(workspace) => {
                console.log(workspace);
              }}
              views={workspaceViews()}
              setViews={props.setViews}
            />
          )}
        </Show>
      </div>
    </div>
  );
};
