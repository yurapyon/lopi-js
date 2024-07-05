import { mat4 } from "gl-matrix";
import { degreesToRadians } from "src/utils/math";

export type CameraType = "perspective" | "orthographic";

export interface Camera {
  type: CameraType;
  fovDegrees: number;
}

export namespace Camera {
  export const toMatrix = (
    out: mat4,
    camera: Camera,
    width: number,
    height: number
  ) => {
    if (camera.type === "perspective") {
      mat4.perspective(
        out,
        degreesToRadians(camera.fovDegrees),
        width / height,
        0,
        Infinity
      );
    } else {
      throw "unimplemented";
    }
  };
}
