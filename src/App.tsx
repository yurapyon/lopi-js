import {
  Show,
  createEffect,
  createSignal,
  onMount,
  type Component,
} from "solid-js";

import { CommandBar } from "./components/CommandBar";
import { MenuBar } from "./components/MenuBar";
import { SideBar } from "./components/SideBar";
import { ToolList } from "./components/ToolBar/ToolList";
import { Workspaces } from "./components/Views/Workspaces";
import { View, Workspace } from "./lib/LopiStore";
import { useLopiStoreContext } from "./components/providers/LopiStoreProvider";

const App: Component = () => {
  const commandBarAlwaysOpen = false;
  const [enteringCommand, setEnteringCommand] = createSignal(false);

  const { addWorkspace, getWorkspace } = useLopiStoreContext();

  onMount(() => {
    // addEditor(new Editor3d("editor_3d"));
    addWorkspace();
    addWorkspace();
    addWorkspace();

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      switch (e.key) {
        case ":":
          e.preventDefault();
          setEnteringCommand(true);
          break;
        case "Escape":
          e.preventDefault();
          setEnteringCommand(false);
          break;
      }
    });
  });

  const [toolBarCollapsed, setToolBarCollapsed] = createSignal(true);
  const [heirarchyCollapsed, setHeirarchyCollapsed] = createSignal(true);

  createEffect(() => {
    // console.log(selectedToolId());
    // console.log(selectedToolId());
    // console.log(getEditor("editor_3d"));
  });

  const [workspaces, setWorkspaces] = createSignal<Workspace[]>([
    { id: "asdf1", name: "asdf1", viewIds: ["view1"], isSplit: false },
    { id: "asdf2", name: "asdf2", viewIds: ["view2"], isSplit: false },
    { id: "asdf3", name: "asdf3", viewIds: [], isSplit: false },
  ]);

  const [views, setViews] = createSignal<View[]>([
    { id: "view1", editorId: "" },
    { id: "view2", editorId: "" },
  ]);

  return (
    <div class="text-white bg-lopi-grey w-screen h-screen overflow-clip font-[VGA8x14] text-lg">
      <div class="flex flex-col h-full">
        <div class="flex flex-row grow min-h-0">
          <SideBar
            collapsed={toolBarCollapsed()}
            setCollapsed={setToolBarCollapsed}
            collapseLeft={true}
            classList={{ "shrink-0": true }}
          >
            <ToolList />
          </SideBar>

          <div class="grow min-w-0 h-full">
            <Workspaces class="h-full" views={views()} setViews={setViews} />
          </div>

          <SideBar
            collapsed={heirarchyCollapsed()}
            setCollapsed={setHeirarchyCollapsed}
            collapseLeft={false}
            classList={{ "shrink-0": true }}
          >
            {" "}
          </SideBar>
        </div>
        <Show when={commandBarAlwaysOpen || enteringCommand()}>
          <CommandBar
            enteringCommand={enteringCommand()}
            setEnteringCommand={setEnteringCommand}
            executeCommand={(command: string) => {
              console.log("executing", command);
            }}
          />
        </Show>
        <MenuBar openAboutMenu={() => {}} />
      </div>
    </div>
  );
};

export default App;
