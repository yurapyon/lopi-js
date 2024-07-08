import { createUniqueId } from "@utils/createUniqueId";
import { Editor3dData } from "./Editor3dData";
import { EditorAnimationData } from "./EditorAnimationData";
import { EditorUVData } from "./EditorUVData";

export interface EditorBase<T extends string, Data> {
  type: T;
  id: string;
  data: Data;
}

export type Editor3d = EditorBase<"3d", Editor3dData>;
export type EditorUV = EditorBase<"uv", EditorUVData>;
export type EditorAnimation = EditorBase<"animation", EditorAnimationData>;

export type Editor = Editor3d | EditorUV | EditorAnimation;
export type EditorType = Editor["type"];

export const EDITOR_TYPES = ["3d", "uv", "animation"] as const;

export namespace EditorBase {
  export function create<T extends EditorType>(type: T) {
    return {
      type,
      id: createUniqueId(type),
    };
  }
}
