import { mat4 } from "gl-matrix";
import { Camera } from "./Camera";
import { Geometry } from "./Geometry";
import { Mesh } from "./Mesh";
import { Material } from "./Material";
import { SkinnedGeometry } from "./Armature";
import { createUniqueId } from "src/utils/createUniqueId";
import { Transform } from "./Transform";

export interface ISceneObject {
  id: string;
  name: string;
  parent: SceneObject | null;
  children: SceneObject[];
  isActive: boolean;
  transform: Transform;
  // NOTE this should be be kept in sync with transform.matrix
  worldMatrix: mat4;
}

export namespace ISceneObject {
  export const create = (): ISceneObject => {
    const transform = Transform.identity();
    const worldMatrix = mat4.create();
    return {
      id: createUniqueId("scene-object"),
      name: "object",
      parent: null,
      children: [],
      isActive: true,
      transform,
      worldMatrix,
    };
  };
}

export interface SceneRoot extends ISceneObject {
  type: "root";
}

export interface SceneEmpty extends ISceneObject {
  type: "empty";
}

export type MeshRenderMode = "wireframe" | "solid";

export interface SceneMesh extends ISceneObject {
  type: "mesh";
  geometry: Geometry;
  mesh: Mesh;
  material: Material;
  renderMode: MeshRenderMode;
}

export namespace SceneMesh {
  export const render = (gl: WebGL2RenderingContext, sceneMesh: SceneMesh) => {
    gl.useProgram(sceneMesh.material.program);

    gl.uniformMatrix4fv(
      sceneMesh.material.locations.model,
      false,
      sceneMesh.worldMatrix
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, sceneMesh.mesh.vao);
    gl.drawElements(gl.TRIANGLES, sceneMesh.mesh.triCount, gl.UNSIGNED_INT, 0);
  };
}

export interface SceneSkinnedMesh extends ISceneObject {
  type: "skinned-mesh";
  geometry: SkinnedGeometry;
  mesh: Mesh;
  material: Material;
  renderMode: MeshRenderMode;
}

export interface SceneCamera extends ISceneObject {
  type: "camera";
  camera: Camera;
}

export type SceneObject =
  | SceneRoot
  | SceneEmpty
  | SceneMesh
  | SceneSkinnedMesh
  | SceneCamera;
export type SceneObjectType = SceneObject["type"];

export namespace SceneObject {
  export const setParent = (parent: SceneObject, child: SceneObject) => {
    parent.children.push(child);

    if (child.parent) {
      const childIdx = child.parent.children.findIndex(
        (sibling) => sibling.id === child.id
      );
      child.parent.children.splice(childIdx, 1);
    }

    child.parent = parent;
  };
}

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
