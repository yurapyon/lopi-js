import { Camera } from "@lib/data/3d/Camera";
import { Spatial } from "./Spatial";

export interface SceneCamera extends Spatial {
  type: "camera";
  camera: Camera;
}
