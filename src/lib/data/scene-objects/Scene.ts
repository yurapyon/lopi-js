import { createUniqueId } from "@utils/createUniqueId";
import { SceneObject, SceneRoot } from "./SceneObject";
import { Spatial } from "./Spatial";
import { mat4 } from "gl-matrix";

export interface Scene {
  id: string;
  name: string;
  root: SceneRoot;
  sceneObjects: SceneObject[];
}

export namespace Scene {
  export const create = (): Scene => {
    return {
      id: createUniqueId("scene"),
      name: "scene",
      root: {
        type: "root",
        id: createUniqueId("root"),
        name: "root",
        spatial: Spatial.create(),
        data: undefined,
        runtime: { worldMatrix: mat4.create() },
      },
      sceneObjects: [],
    };
  };
}
