import { Mutator } from "@utils/Mutator";
import { Events } from "@lib/process/Events";
import { MouseState } from "@lib/process/events/MouseState";
import { SceneObjectBase } from "@lib/data/scene-objects/SceneObject";
import { vec2, vec3 } from "gl-matrix";
import { Scene } from "@lib/data/Scene";
import { SceneCamera } from "@lib/data/scene-objects/SceneCamera";

export type RenderStyle = "wireframe" | "flat" | "shader";

export interface Editor3dData {
  camera: SceneCamera;
  renderStyle: RenderStyle;
}

export namespace Editor3dData {
  export const create = (): Editor3dData => {
    return {
      camera: {
        ...SceneObjectBase.create("camera"),
        name: "editor:camera",
        data: {
          projectionType: "perspective",
          fovDegrees: 90,
        },
      },
      renderStyle: "flat",
    };
  };

  const tempVec2 = vec2.create();

  export const processMouseState = (
    editor3dData: Editor3dData,
    mutateEditorData: Mutator<Editor3dData>,
    mouseState: MouseState,
    mutateMouseState: Mutator<MouseState>,
    scene: Scene,
    mutateScene: Mutator<Scene>
  ) => {
    MouseState.positionInLastElement(tempVec2, mouseState);
    // console.log(tempVec2);

    const lastEvent = mouseState.lastEvent;
    if (lastEvent.type === "mousedown") {
      const eCanvas = lastEvent.target as HTMLCanvasElement;
      mutateMouseState((state) => {
        Events.startPointerLock(state, eCanvas, () => {
          console.log("cancelled grab");
        });
      });
    }

    mutateEditorData((editor3dData) => {
      const newPosition = [...editor3dData.camera.spatial.transform.position];
      newPosition[0] = mouseState.lastEvent.screenX;
      editor3dData.camera.spatial.transform.position = newPosition as vec3;
    });

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
    editor3dData: Editor3dData,
    mutateEditorData: Mutator<Editor3dData>,
    e: KeyboardEvent,
    scene: Scene,
    mutateScene: Mutator<Scene>
  ) => {
    //
  };
}
