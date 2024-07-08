import { createUniqueId } from "@utils/createUniqueId";
import {
  SceneObject,
  SceneObjectBase,
  SceneRoot,
} from "./scene-objects/SceneObject";

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
        ...SceneObjectBase.create("root"),
        name: "root",
        data: undefined,
      },
      sceneObjects: [],
    };
  };
}
