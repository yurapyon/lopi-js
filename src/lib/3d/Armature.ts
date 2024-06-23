import { mat4 } from "gl-matrix";
import { Geometry, Vertex } from "./Geometry";

export interface Bone {
  matrix: mat4;
  parent: Bone | null;
  weights: [Vertex, number][];
}

export interface Armature {
  root: Bone;
  bones: Bone[];
}

export interface SkinnedGeometry {
  geometry: Geometry;
  armature: Armature;
}
