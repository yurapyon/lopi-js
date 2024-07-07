import { SceneCamera } from "@lib/nodes/scene/SceneCamera";
import { IEditor } from "./Editor";
import { Scene } from "@lib/nodes/scene/Scene";
import { Mutator } from "@utils/Mutator";
import { Events } from "@lib/process/Events";
import { Spatial } from "@lib/nodes/scene/Spatial";
import { MouseState } from "@lib/process/events/MouseState";

export type RenderStyle = "wireframe" | "flat" | "shader";

export interface Editor3d extends IEditor {
  type: "3d";
  camera: SceneCamera;
  renderStyle: RenderStyle;
  external: number;
  untracked: {
    internal: number;
  };
}

export namespace Editor3d {
  export const create = (): Editor3d => {
    const iEditor = IEditor.create();
    return {
      ...iEditor,
      type: "3d",
      camera: {
        ...Spatial.create(),
        type: "camera",
        name: iEditor.id + ":camera",
        camera: {
          type: "perspective",
          fovDegrees: 90,
        },
      },
      renderStyle: "flat",
      external: 0,
      untracked: {
        internal: 0,
      },
    };
  };

  export const processMouseState = (
    editor3d: Editor3d,
    mutateEditor: Mutator<Editor3d>,
    mouseState: MouseState,
    mutateMouseState: Mutator<MouseState>,
    scene: Scene,
    mutateScene: Mutator<Scene>
  ) => {
    const lastEvent = mouseState.lastEvent;
    if (lastEvent.type === "mousedown") {
      const eCanvas = lastEvent.target as HTMLCanvasElement;
      mutateMouseState((state) => {
        Events.startPointerLock(state, eCanvas, () => {
          console.log("cancelled grab");
        });
      });
    }

    /*
    const untracked = unwrap(editor3d.untracked);
    untracked.internal = mouseState.lastEvent.screenX;

    mutateEditor((editor3d) => {
      if (untracked.internal % 5 === 0) {
        editor3d.external = untracked.internal;
      }
    });

    if (scene.name === "internal") {
      mutateScene((scene) => {
        const camera = scene.sceneObjects[0] as SceneCamera;
        const previousPosition = camera.transform.position;
        const newPosition = [...previousPosition];
        newPosition[0] = mouseState.lastEvent.screenX;
        camera.transform.position = newPosition as vec3;
      });
    }
     */
  };

  export const processKeyboardEvent = (
    editor3d: Editor3d,
    mutateEditor: Mutator<Editor3d>,
    e: KeyboardEvent,
    scene: Scene,
    mutateScene: Mutator<Scene>
  ) => {
    //
  };
}
