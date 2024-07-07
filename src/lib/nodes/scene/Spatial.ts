import { Transform } from "@lib/data/3d/Transform";
import { LopiNode } from "@lib/nodes/LopiNode";
import { mat4 } from "gl-matrix";

export interface Spatial extends LopiNode {
  parent: Spatial | null;
  children: Spatial[];
  isActive: boolean;
  transform: Transform;
  // NOTE this should be be kept in sync with transform.matrix
  worldMatrix: mat4;
}

export namespace Spatial {
  export const create = (): Spatial => {
    const transform = Transform.identity();
    const worldMatrix = mat4.create();
    return {
      ...LopiNode.create(),
      parent: null,
      children: [],
      isActive: true,
      transform,
      worldMatrix,
    };
  };

  export const setParent = (parent: Spatial, child: Spatial) => {
    if (child.parent) {
      const childIdx = child.parent.children.findIndex(
        (sibling) => sibling.id === child.id
      );
      child.parent.children.splice(childIdx, 1);
    }

    parent.children.push(child);
    child.parent = parent;
  };

  export const updateWorldMatrix = (spatial: Spatial, tempMat4: mat4) => {
    if (spatial.parent) {
      Transform.toMatrix(tempMat4, spatial.transform);
      // TODO verify multiplication is in the right order
      mat4.multiply(spatial.worldMatrix, spatial.parent.worldMatrix, tempMat4);
    } else {
      Transform.toMatrix(spatial.worldMatrix, spatial.transform);
    }
  };
}
