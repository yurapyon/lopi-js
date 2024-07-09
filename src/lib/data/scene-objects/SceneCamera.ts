import { mat4 } from "gl-matrix";
import { Camera } from "./Camera";
import { SceneObjectBase } from "./SceneObject";

export type SceneCamera = SceneObjectBase<"camera", Camera>;

export namespace SceneCamera {
  export const toPVMatrix = (
    out: mat4,
    sceneCamera: SceneCamera,
    width: number,
    height: number
  ) => {
    Camera.toMatrix(out, sceneCamera.data, width, height);
    mat4.multiply(out, out, sceneCamera.spatial.runtime.worldMatrix);
  };
}
