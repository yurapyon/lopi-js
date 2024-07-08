import { mat4, quat, vec3 } from "gl-matrix";

export interface Transform {
  position: vec3;
  rotation: quat;
  scale: vec3;
}

export namespace Transform {
  export const identity = (): Transform => {
    return {
      position: vec3.create(),
      rotation: quat.create(),
      scale: vec3.create(),
    };
  };

  export const toMatrix = (out: mat4, transform: Transform) => {
    mat4.fromRotationTranslationScale(
      out,
      transform.rotation,
      transform.position,
      transform.scale
    );
  };

  export const toMatrixRelative = (
    out: mat4,
    transform: Transform,
    relativeTo: mat4
  ) => {
    toMatrix(out, transform);
    // TODO verify multiplication is in the right order
    mat4.multiply(out, out, relativeTo);
  };
}
