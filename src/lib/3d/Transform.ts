import { mat4, quat, vec3 } from "gl-matrix";

export interface Transform {
  position: vec3;
  rotation: quat;
  scale: vec3;
  matrix: mat4;
}

export namespace Transform {
  export const create = (): Transform => {
    const matrix = mat4.create();
    return {
      position: vec3.create(),
      rotation: quat.create(),
      scale: vec3.create(),
      matrix,
    };
  };
}
