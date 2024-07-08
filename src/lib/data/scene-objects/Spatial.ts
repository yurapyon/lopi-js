import { mat4 } from "gl-matrix";
import { Transform } from "../math/Transform";

export interface Spatial {
  parent: Spatial | null;
  children: Spatial[];
  isActive: boolean;
  transform: Transform;
  runtime: {
    isActiveRelative: boolean;
    worldMatrix: mat4;
  };
}

export namespace Spatial {
  export const create = (): Spatial => {
    const transform = Transform.identity();
    return {
      parent: null,
      children: [],
      isActive: true,
      transform,
      runtime: {
        isActiveRelative: true,
        worldMatrix: mat4.create(),
      },
    };
  };

  export const setParent = (parent: Spatial, child: Spatial) => {
    if (child.parent) {
      const childIdx = child.parent.children.findIndex((sibling) =>
        Object.is(sibling, child)
      );
      child.parent.children.splice(childIdx, 1);
    }

    parent.children.push(child);
    child.parent = parent;
  };

  export const updateRuntime = (spatial: Spatial) => {
    if (spatial.parent) {
      Transform.toMatrixRelative(
        spatial.runtime.worldMatrix,
        spatial.transform,
        spatial.parent.runtime.worldMatrix
      );
      spatial.runtime.isActiveRelative =
        spatial.parent.runtime.isActiveRelative;
    } else {
      Transform.toMatrix(spatial.runtime.worldMatrix, spatial.transform);
    }
  };
}
