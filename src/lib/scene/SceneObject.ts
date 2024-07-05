import { Transform } from "@lib/3d/Transform";
import { createUniqueId } from "@utils/createUniqueId";
import { mat4 } from "gl-matrix";
import { SceneRoot } from "./SceneRoot";
import { SceneEmpty } from "./SceneEmpty";
import { SceneMesh, SceneSkinnedMesh } from "./SceneMesh";
import { SceneCamera } from "./SceneCamera";

export interface ISceneObject {
  id: string;
  name: string;
  parent: SceneObject | null;
  children: SceneObject[];
  isActive: boolean;
  transform: Transform;
  // NOTE this should be be kept in sync with transform.matrix
  worldMatrix: mat4;
}

export namespace ISceneObject {
  export const create = (): ISceneObject => {
    const transform = Transform.identity();
    const worldMatrix = mat4.create();
    return {
      id: createUniqueId("scene-object"),
      name: "object",
      parent: null,
      children: [],
      isActive: true,
      transform,
      worldMatrix,
    };
  };
}

export type SceneObject =
  | SceneRoot
  | SceneEmpty
  | SceneMesh
  | SceneSkinnedMesh
  | SceneCamera;

export type SceneObjectType = SceneObject["type"];

export namespace SceneObject {
  export const setParent = (parent: SceneObject, child: SceneObject) => {
    parent.children.push(child);

    if (child.parent) {
      const childIdx = child.parent.children.findIndex(
        (sibling) => sibling.id === child.id
      );
      child.parent.children.splice(childIdx, 1);
    }

    child.parent = parent;
  };
}
