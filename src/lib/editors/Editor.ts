import { createUniqueId } from "@utils/createUniqueId";
import { Editor3d } from "./Editor3d";
import { EditorUV } from "./EditorUV";
import { EditorAnimation } from "./EditorAnimation";

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

export type Editor = Editor3d | EditorUV | EditorAnimation;
export type EditorType = Editor["type"];

export const EDITOR_TYPES = ["3d", "uv", "animation"] as const;
