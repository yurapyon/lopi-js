import { RuntimeCamera } from "@lib/runtime/RuntimeCamera";
import { Camera } from "./Camera";
import { Geometry } from "./Geometry";
import { Spatial } from "./Spatial";
import { RuntimeGeometry } from "@lib/runtime/RuntimeGeometry";
import { LopiNode } from "../LopiNode";
import { mat4 } from "gl-matrix";

interface RuntimeSceneObject {
  worldMatrix: mat4;
}

interface SceneObjectBase<T extends string, Data, RuntimeData>
  extends LopiNode<T, Data, RuntimeData & RuntimeSceneObject> {
  spatial: Spatial;
}

export type SceneRoot = SceneObjectBase<"root", undefined, {}>;
export type SceneEmpty = SceneObjectBase<"empty", {}, {}>;
export type SceneCamera = SceneObjectBase<"camera", Camera, RuntimeCamera>;
export type SceneGeometry = SceneObjectBase<
  "geometry",
  Geometry,
  RuntimeGeometry
>;

export type SceneObject = SceneRoot | SceneEmpty | SceneCamera | SceneGeometry;
export type SceneObjectType = SceneObject["type"];
