import { Camera } from "@lib/3d/Camera";
import { Material } from "@lib/3d/Material";
import { Scene } from "@lib/nodes/scene/Scene";
import { SceneCamera } from "@lib/nodes/scene/SceneCamera";
import { SceneMesh } from "@lib/nodes/scene/SceneMesh";
import { mat4 } from "gl-matrix";

export interface RenderingContext {
  projectionMatrix: mat4;
  viewMatrix: mat4;
}

export namespace RenderingContext {
  export const setProjection = (
    context: RenderingContext,
    camera: Camera,
    width: number,
    height: number
  ) => {
    Camera.toMatrix(context.projectionMatrix, camera, width, height);
  };

  export const setView = (context: RenderingContext, viewMatrix: mat4) => {
    mat4.copy(context.viewMatrix, viewMatrix);
  };
}

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

  const useMaterial = (
    gl: WebGL2RenderingContext,
    material: Material,
    renderingContext: RenderingContext
  ) => {
    gl.useProgram(material.program);
    gl.uniformMatrix4fv(
      material.locations.projection,
      false,
      renderingContext.projectionMatrix
    );
    gl.uniformMatrix4fv(
      material.locations.view,
      false,
      renderingContext.viewMatrix
    );
  };

  export const render = (
    canvas: HTMLCanvasElement,
    scene: Scene,
    camera: SceneCamera
  ) => {
    const context: RenderingContext = {
      projectionMatrix: mat4.create(),
      viewMatrix: mat4.create(),
    };

    RenderingContext.setProjection(
      context,
      camera.camera,
      canvas.width,
      canvas.height
    );

    RenderingContext.setView(context, camera.worldMatrix);

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      // TODO error
      throw "error";
    }

    updateTransforms(scene);

    // TODO for a given material we have to update the camera related uniforms

    for (const currentObject of scene.sceneObjects) {
      switch (currentObject.type) {
        case "root":
          break;
        case "empty":
          break;
        case "material-group":
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
