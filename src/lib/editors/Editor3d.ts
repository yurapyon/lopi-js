import { SceneCamera } from "@lib/scene/SceneCamera";
import { IEditor } from "./Editor";
import { ISceneObject } from "@lib/scene/SceneObject";
import { Scene } from "@lib/scene/Scene";
import { Mutator } from "@utils/Mutator";
import { vec3 } from "gl-matrix";

export type RenderStyle = "wireframe" | "flat" | "shader";

export interface Editor3d extends IEditor {
  type: "3d";
  camera: SceneCamera;
  renderStyle: RenderStyle;
  currentSceneId: string | null;
  dummyInfo: { x: number; y: number };
}

export namespace Editor3d {
  export const create = (): Editor3d => {
    const iEditor = IEditor.create();
    return {
      ...iEditor,
      type: "3d",
      camera: {
        ...ISceneObject.create(),
        type: "camera",
        name: iEditor.id + ":camera",
        camera: {
          type: "perspective",
          fovDegrees: 90,
        },
      },
      renderStyle: "flat",
      currentSceneId: null,
      dummyInfo: { x: 0, y: 0 },
    };
  };

  export const processMouseEvent = (
    editor3d: Editor3d,
    mutateEditor: Mutator<Editor3d>,
    e: MouseEvent,
    scene: Scene,
    mutateScene: Mutator<Scene>
  ) => {
    //
    mutateEditor((editor3d) => {
      editor3d.dummyInfo.x = e.screenX;
      editor3d.dummyInfo.y = e.screenY;
    });

    if (scene.name === "internal") {
      mutateScene((scene) => {
        const camera = scene.sceneObjects[0] as SceneCamera;
        const previousPosition = camera.transform.position;
        const newPosition = [...previousPosition];
        newPosition[0] = e.screenX;
        camera.transform.position = newPosition as vec3;
      });
    }
  };
}
