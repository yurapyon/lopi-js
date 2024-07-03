import { Component, For, createSelector } from "solid-js";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { Button } from "../general-ui/Button";

export const WorkspaceTabBar: Component<{
  currentWorkspaceId: string | null;
  setCurrentWorkspaceId: (id: string) => void;
}> = (props) => {
  const { addWorkspace, removeWorkspace, getWorkspaces, setWorkspace } =
    useLopiStoreContext();

  const isSelected = createSelector(() => props.currentWorkspaceId);

  return (
    <div class="flex flex-row">
      <For each={getWorkspaces()}>
        {(workspace) => {
          return (
            <div>
              <Button
                class="w-[18ch]"
                selected={isSelected(workspace.id)}
                onClick={() => props.setCurrentWorkspaceId(workspace.id)}
                variant="light"
              >
                {workspace.name}
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
      <Button
        class="px-[1ch]"
        onClick={() => {
          const newWorkspaceId = addWorkspace();
          // const newViewId = addView();
          setWorkspace(newWorkspaceId, {
            name: "New workspace",
            // viewIds: [newViewId],
          });
        }}
      >
        +
      </Button>
    </div>
  );
};
