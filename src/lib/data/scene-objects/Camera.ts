import { mat4 } from "gl-matrix";
import { degreesToRadians } from "@utils/math";

export type ProjectionType = "perspective" | "orthographic";

export interface Camera {
  projectionType: ProjectionType;
  fovDegrees: number;
}

export namespace Camera {
  export const create = (): Camera => {
    return {
      projectionType: "perspective",
      fovDegrees: 90,
    };
  };

  export const toMatrix = (
    out: mat4,
    camera: Camera,
    width: number,
    height: number
  ) => {
    if (camera.projectionType === "perspective") {
      mat4.perspective(
        out,
        degreesToRadians(camera.fovDegrees),
        width / height,
        0,
        Infinity
      );
    } else {
      // TODO
      throw "unimplemented";
    }
  };
}
