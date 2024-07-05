import { createUniqueId } from "@utils/createUniqueId";
import { SceneRoot } from "./SceneRoot";
import { ISceneObject, SceneObject } from "./SceneObject";
import { SceneCamera } from "./SceneCamera";
import { SceneMesh } from "./SceneMesh";

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

  const updateTransforms = (scene: Scene) => {
    // TODO can also update item visibility based on parent
    // dont need to do this probably
    /*
    const currentModelMatrix = scene.root.transform.localMatrix;
    let currentObject = scene.root as SceneObject;
    mat4.multiply(
      currentObject.transform.worldMatrix,
      currentModelMatrix,
      currentObject.transform.localMatrix
    );
    */
  };

  export const render = (
    gl: WebGL2RenderingContext,
    scene: Scene,
    camera: SceneCamera
  ) => {
    updateTransforms(scene);

    // const projectionMatrix = mat4.create();
    // Camera.toMatrix(projectionMatrix, camera.camera);

    // TODO for a given material we have to update the camera related uniforms

    for (const currentObject of scene.sceneObjects) {
      switch (currentObject.type) {
        case "root":
          break;
        case "empty":
          break;
        case "mesh":
          SceneMesh.render(gl, currentObject);
          break;
        case "skinned-mesh":
          break;
        case "camera":
          break;
      }
    }
  };
}
