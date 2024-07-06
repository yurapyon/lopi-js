import { Component, Setter, Show } from "solid-js";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { Scene } from "@lib/scene/Scene";
import { Editor3d } from "@lib/editors/Editor3d";
import { Mutator } from "@utils/Mutator";
import { MouseState } from "@lib/events/MouseState";
import { Rendering } from "@lib/process/Rendering";
import { Events } from "@lib/process/Events";
import { useInteractionStateContext } from "../providers/InteractionProvider";

const Editor3dCanvas: Component<{
  editor3d: Editor3d;
  mutateEditor3d: Mutator<Editor3d>;
  scene: Scene;
  mutateScene: Mutator<Scene>;
}> = (props) => {
  const mouseState = MouseState.createEmpty();
  const onMouse = (e: MouseEvent) => {
    Events.processMouseEvent(mouseState, e);
    Editor3d.processMouseState(
      props.editor3d,
      props.mutateEditor3d,
      mouseState,
      (mutateFn) => {
        mutateFn(mouseState);
      },
      props.scene,
      props.mutateScene
    );
  };
  const onKey = (e: KeyboardEvent) => {
    Editor3d.processKeyboardEvent(
      props.editor3d,
      props.mutateEditor3d,
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
            Rendering.render(eCanvas, props.scene, props.editor3d.camera);
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
      {props.editor.external}
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
