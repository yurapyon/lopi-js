import { createUniqueId } from "@utils/createUniqueId";
import { SceneRoot } from "./SceneRoot";
import { ISceneObject, SceneObject } from "./SceneObject";

export interface Scene {
  id: string;
  name: string;
  root: SceneRoot;
  sceneObjects: SceneObject[];
}

export namespace Scene {
  export const create = (): Scene => {
    const root: SceneRoot = {
      ...ISceneObject.create(),
      type: "root",
      name: "root",
    };
    return {
      id: createUniqueId("scene"),
      name: "scene",
      root,
      sceneObjects: [],
    };
  };
}
