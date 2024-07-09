import { Geometry } from "./Geometry";
import { Spatial } from "./Spatial";
import { LopiNode } from "../LopiNode";
import { createUniqueId } from "@utils/createUniqueId";
import { SkinnedGeometry } from "./SkinnedGeometry";
import { Armature, Bone } from "./Armature";
import { SceneCamera } from "./SceneCamera";

export interface SceneObjectBase<T extends string, Data>
  extends LopiNode<T, Data> {
  spatial: Spatial;
}

export type SceneRoot = SceneObjectBase<"root", undefined>;
export type SceneEmpty = SceneObjectBase<"empty", {}>;
export type SceneGeometry = SceneObjectBase<"geometry", Geometry>;
export type SceneSkinnedGeometry = SceneObjectBase<
  "skinned-geometry",
  SkinnedGeometry
>;
export type SceneArmature = SceneObjectBase<"armature", Armature>;
export type SceneBone = SceneObjectBase<"bone", Bone>;

export type SceneObject =
  | SceneRoot
  | SceneEmpty
  | SceneCamera
  | SceneGeometry
  | SceneSkinnedGeometry
  | SceneArmature
  | SceneBone;
export type SceneObjectType = SceneObject["type"];

export namespace SceneObjectBase {
  export function create<T extends SceneObjectType>(type: T) {
    return {
      type,
      id: createUniqueId(type),
      spatial: Spatial.create(),
    };
  }
}
