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
import { Workspaces } from "./components/workspaces/Workspaces";
import { useLopiStoreContext } from "./components/providers/LopiStoreProvider";
import { useInteractionStateContext } from "./components/providers/InteractionProvider";
import { DataLists } from "./components/data-inputs/DataLists";
import { Scene } from "@lib/nodes/scene/Scene";
import { Editor3d } from "@lib/editors/Editor3d";
import { Spatial } from "@lib/nodes/scene/Spatial";

const App: Component = () => {
  const [enteringCommand, setEnteringCommand] = createSignal(false);

  const store = useLopiStoreContext();
  const { selectedEditorId, setSelectedEditorId } =
    useInteractionStateContext();

  onMount(() => {
    const internalScene = Scene.create();
    internalScene.name = "internal";
    store.addScene(internalScene);

    const e3d = Editor3d.create();
    Spatial.setParent(internalScene.root, e3d.camera);
    internalScene.sceneObjects.push(e3d.camera);
    const e_id = store.addEditor(e3d);
    setSelectedEditorId(e_id);

    const w_id = store.addWorkspace();
    store.setWorkspace(w_id, { name: "asdf", editorIds: [e_id] });

    store.addScene(Scene.create());
    store.addScene(Scene.create());

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

  createEffect(() => {
    //console.log( (store.getScenes()[0].sceneObjects[0] as SceneCamera).camera.type);
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
            <DataLists class="text-base" />
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
