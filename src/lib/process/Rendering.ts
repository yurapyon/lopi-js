import { Camera } from "@lib/3d/Camera";
import { Scene } from "@lib/scene/Scene";
import { SceneCamera } from "@lib/scene/SceneCamera";
import { SceneMesh } from "@lib/scene/SceneMesh";
import { mat4 } from "gl-matrix";

export namespace Rendering {
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
    canvas: HTMLCanvasElement,
    scene: Scene,
    camera: SceneCamera
  ) => {
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      // TODO error
      throw "error";
    }

    updateTransforms(scene);

    const projectionMatrix = mat4.create();
    Camera.toMatrix(
      projectionMatrix,
      camera.camera,
      canvas.width,
      canvas.height
    );

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
