import { Component, Setter, createEffect, createSignal } from "solid-js";
import { Button } from "../general-ui/Button";
import { ViewComponent } from "./View";
import { View, Workspace } from "../../lib/LopiStore";

export const WorkspaceComponent: Component<{
  workspace: Workspace;
  setWorkspace: (workspace: Workspace) => void;
  views: View[];
  // setViews: Setter<View[]>;
}> = (props) => {
  const [isSplitView, setIsSplitView] = createSignal(false);

  const splitWorkspace = () => {
    const newView: View = {
      id: "new",
      editorId: "new",
    };
    props.setWorkspace({
      ...props.workspace,
      viewIds: [...props.workspace.viewIds, newView.id],
    });
    /*
    props.setViews((pastViews) => {
      return [...pastViews, newView];
    });
    */
    setIsSplitView(true);
  };

  return (
    <div class="flex flex-col h-full">
      <div class="grow min-h-0 bg-black">
        <ViewComponent view={props.views[0]} />
      </div>
      <div class="flex flex-row justify-center bg-lopi-grey">
        <Button
          class="text-base px-[1ch]"
          onClick={() => {
            if (isSplitView()) {
            } else {
              splitWorkspace();
            }
          }}
        >
          {isSplitView() ? "unsplit" : "split"}
        </Button>
      </div>
    </div>
  );
};
