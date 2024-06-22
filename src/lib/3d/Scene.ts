import { mat4 } from "gl-matrix";
import { CameraSettings } from "./Camera";
import { Geometry } from "./Geometry";
import { Mesh } from "./Mesh";
import { Material } from "./Material";

export interface Transform {
  matrix: mat4;
  isVisible: boolean;
  parent: Transform | null;
  // TODO
  // cachedWorldMatrix: mat4;
}

export interface SceneRoot {
  type: "root";
  transform: Transform;
}

export interface SceneEmpty {
  type: "empty";
  transform: Transform;
}

export interface SceneMesh {
  type: "mesh";
  transform: Transform;
  geometry: Geometry;
  mesh: Mesh;
  material: Material;
}

export interface SceneCamera {
  type: "camera";
  transform: Transform;
  settings: CameraSettings;
}

export type SceneObject = SceneRoot | SceneEmpty | SceneMesh | SceneCamera;
export type SceneObjectType = SceneObject["type"];

export interface Scene {
  root: SceneRoot;
}
