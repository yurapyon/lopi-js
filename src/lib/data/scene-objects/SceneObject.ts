import { Camera } from "./Camera";
import { Geometry } from "./Geometry";
import { Spatial } from "./Spatial";
import { LopiNode } from "../LopiNode";
import { mat4 } from "gl-matrix";
import { createUniqueId } from "@utils/createUniqueId";

interface SceneObjectBase<T extends string, Data> extends LopiNode<T, Data> {
  spatial: Spatial;
}

export type SceneRoot = SceneObjectBase<"root", undefined>;
export type SceneEmpty = SceneObjectBase<"empty", {}>;
export type SceneCamera = SceneObjectBase<"camera", Camera>;
export type SceneGeometry = SceneObjectBase<"geometry", Geometry>;

export type SceneObject = SceneRoot | SceneEmpty | SceneCamera | SceneGeometry;
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
