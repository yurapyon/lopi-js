import { Component, Show } from "solid-js";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { Mutator } from "@utils/Mutator";
import { Rendering } from "@lib/process/Rendering";
import { Events } from "@lib/process/Events";
import { useInteractionStateContext } from "../providers/InteractionProvider";
import { MouseState } from "@lib/process/events/MouseState";
import { Scene } from "@lib/data/Scene";
import { Editor3d } from "@lib/editors/Editor";
import { Editor3dData } from "@lib/editors/Editor3dData";

const Editor3dCanvas: Component<{
  editor3d: Editor3d;
  mutateEditor3d: Mutator<Editor3d>;
  scene: Scene;
  mutateScene: Mutator<Scene>;
}> = (props) => {
  const mouseState = MouseState.createEmpty();
  const mutateEditor3dData = (mutateFn: (data: Editor3dData) => void) => {
    props.mutateEditor3d((editor3d) => {
      mutateFn(editor3d.data);
    });
  };
  const onMouse = (e: MouseEvent) => {
    Events.processMouseEvent(mouseState, e);
    Editor3dData.processMouseState(
      props.editor3d.data,
      mutateEditor3dData,
      mouseState,
      (mutateFn) => {
        mutateFn(mouseState);
      },
      props.scene,
      props.mutateScene
    );
  };
  const onKey = (e: KeyboardEvent) => {
    Editor3dData.processKeyboardEvent(
      props.editor3d.data,
      mutateEditor3dData,
      e,
      props.scene,
      props.mutateScene
    );
  };
  return (
    <canvas
      class="grow min-h-0"
      ref={(ref) => {
        if (ref) {
          ref.addEventListener("resize", (e) => {
            const eCanvas = e.target as HTMLCanvasElement;
            const gl = eCanvas.getContext("webgl2");
            if (!gl) {
              // TODO error
              throw "error";
            }
            Rendering.render(eCanvas, props.scene, props.editor3d.data.camera);
          });
        }
      }}
      onMouseDown={onMouse}
      onMouseUp={onMouse}
      onMouseMove={onMouse}
      onMouseEnter={onMouse}
      onMouseLeave={onMouse}
      onMouseOver={onMouse}
      onMouseOut={onMouse}
      onKeyDown={onKey}
      onKeyUp={onKey}
    />
  );
};

export const Editor3dComponent: Component<{
  editor: Editor3d;
  mutateEditor: Mutator<Editor3d>;
}> = (props) => {
  const { getScene, produceScene } = useLopiStoreContext();
  const { selectedSceneId } = useInteractionStateContext();

  return (
    <div class="flex flex-col h-full">
      {props.editor.data.camera.spatial.transform.position[0]}
      <Show when={selectedSceneId()} fallback={"no scene selected"} keyed>
        {(currentSceneId) => {
          const scene = getScene(currentSceneId);
          if (!scene) {
            // TODO error
            throw "error";
          }

          const mutateScene = (mutate: (scene: Scene) => void) => {
            produceScene(scene.id, mutate);
          };

          return (
            <Editor3dCanvas
              editor3d={props.editor}
              mutateEditor3d={props.mutateEditor}
              scene={scene}
              mutateScene={mutateScene}
            />
          );
        }}
      </Show>
    </div>
  );
};
