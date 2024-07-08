import { createUniqueId } from "@utils/createUniqueId";
import {
  SceneObject,
  SceneObjectBase,
  SceneRoot,
} from "./scene-objects/SceneObject";
import { Spatial } from "./scene-objects/Spatial";

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

  export const updateRuntime = (scene: Scene) => {
    const queue: Spatial[] = [];
    let current: Spatial | undefined = scene.root.spatial;
    while (current) {
      Spatial.updateRuntime(current);
      queue.push(...current.children);
      current = queue.shift();
    }
  };
}
