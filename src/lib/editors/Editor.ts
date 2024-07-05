import { ISceneObject, SceneCamera } from "../3d/Scene";
import { createUniqueId } from "src/utils/createUniqueId";

export interface IEditor {
  id: string;
}

export namespace IEditor {
  export const create = (): IEditor => {
    const id = createUniqueId("editor");
    return {
      id,
    };
  };
}

export type RenderStyle = "wireframe" | "flat" | "shader";

export interface Editor3d extends IEditor {
  type: "3d";
  camera: SceneCamera;
  renderStyle: RenderStyle;
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
    };
  };
}

export interface EditorUV extends IEditor {
  type: "uv";
}

export interface EditorAnimation extends IEditor {
  type: "animation";
}

export type Editor = Editor3d | EditorUV | EditorAnimation;
export type EditorType = Editor["type"];

export const EDITOR_TYPES = ["3d", "uv", "animation"] as const;
