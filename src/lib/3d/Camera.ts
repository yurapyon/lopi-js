import { mat4 } from "gl-matrix";
import { degreesToRadians } from "../utils/math";
import { Accessor, Setter } from "solid-js";

export type CameraType = "perspective" | "orthographic";

export interface Camera {
  type: CameraType;
  fovDegrees: number;
  width: number;
  height: number;
  matrix: mat4;
}

export namespace Camera {
  export const createPerspective = (
    fovDegrees: number,
    width: number,
    height: number
  ): Camera => {
    const matrix = mat4.create();
    // TODO just write this myself ?
    mat4.perspective(
      matrix,
      degreesToRadians(fovDegrees),
      width / height,
      0,
      Infinity
    );
    return {
      type: "perspective",
      fovDegrees,
      width,
      height,
      matrix,
    };
  };
}
