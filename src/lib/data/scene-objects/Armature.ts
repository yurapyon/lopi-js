import { Geometry, Vertex } from "./Geometry";
import { Transform } from "../math/Transform";

export interface Bone {
  transform: Transform;
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
