import {
  Show,
  createEffect,
  createResource,
  createSignal,
  onMount,
  type Component,
} from "solid-js";

import { CommandBar } from "./components/CommandBar";
import { MenuBar } from "./components/MenuBar";
import { SideBar } from "./components/SideBar";
import { ToolList } from "./components/ToolBar/ToolList";
import { Workspaces } from "./components/Views/Workspaces";
import { useLopiStoreContext } from "./components/providers/LopiStoreProvider";

const App: Component = () => {
  const [enteringCommand, setEnteringCommand] = createSignal(false);

  const store = useLopiStoreContext();

  onMount(() => {
    const w_id = store.addWorkspace();
    const v_id = store.addView();
    store.setWorkspace(w_id, { name: "asdf", viewIds: [v_id] });

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
            <Workspaces class="h-full" />
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
        <Show
          when={store.getSettings().commandBarAlwaysOpen || enteringCommand()}
        >
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
