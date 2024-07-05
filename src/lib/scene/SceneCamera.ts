import { Camera } from "@lib/3d/Camera";
import { ISceneObject } from "./SceneObject";

export interface SceneCamera extends ISceneObject {
  type: "camera";
  camera: Camera;
}
