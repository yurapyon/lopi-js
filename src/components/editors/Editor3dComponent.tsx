import { Component } from "solid-js";
import { Scene } from "../../lib/3d/Scene";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { Editor3d } from "../../lib/editors/Editor";

export const Editor3dComponent: Component<{ editor: Editor3d }> = (props) => {
  const { getScene } = useLopiStoreContext();
  return (
    <div class="flex flex-col h-full">
      <canvas
        class="grow min-h-0"
        ref={(ref) => {
          if (ref) {
            ref.addEventListener("resize", (e) => {
              const eCanvas = e.target as HTMLCanvasElement;
              const gl = eCanvas.getContext("webgl2");
              // TODO this is messy
              if (gl) {
                Scene.render(gl, getScene("scene_id")!, props.editor.camera);
              }
            });
          }
        }}
      />
    </div>
  );
};
