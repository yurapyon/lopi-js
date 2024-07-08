import { IEditor } from "./Editor";
import { Mutator } from "@utils/Mutator";
import { Events } from "@lib/process/Events";
import { MouseState } from "@lib/process/events/MouseState";
import { SceneCamera } from "@lib/data/scene-objects/SceneObject";
import { Spatial } from "@lib/data/scene-objects/Spatial";
import { mat4 } from "gl-matrix";
import { createUniqueId } from "@utils/createUniqueId";
import { Scene } from "@lib/data/scene-objects/Scene";

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
        type: "camera",
        id: createUniqueId("camera"),
        name: iEditor.id + ":camera",
        data: {
          projectionType: "perspective",
          fovDegrees: 90,
        },
        runtime: {
          worldMatrix: mat4.create(),
          projectionMatrix: mat4.create(),
        },
        spatial: Spatial.create(),
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
