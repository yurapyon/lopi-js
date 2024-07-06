import { Component, Setter, Show } from "solid-js";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { Scene } from "@lib/scene/Scene";
import { Editor3d } from "@lib/editors/Editor3d";
import { Mutator } from "@utils/Mutator";

const Editor3dCanvas: Component<{
  editor3d: Editor3d;
  mutateEditor3d: Mutator<Editor3d>;
  scene: Scene;
  mutateScene: Mutator<Scene>;
}> = (props) => {
  const onMouse = (e: MouseEvent) => {
    Editor3d.processMouseEvent(
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
            Scene.render(gl, props.scene, props.editor3d.camera);
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
    />
  );
};

export const Editor3dComponent: Component<{
  editor: Editor3d;
  mutateEditor: Mutator<Editor3d>;
}> = (props) => {
  const { getScene, produceScene } = useLopiStoreContext();

  return (
    <div class="flex flex-col h-full">
      {props.editor.dummyInfo.x}
      {props.editor.dummyInfo.y}
      <Show
        when={props.editor.currentSceneId}
        fallback={"no scene selected"}
        keyed
      >
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
