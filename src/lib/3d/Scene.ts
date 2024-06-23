import { mat4 } from "gl-matrix";
import { Camera } from "./Camera";
import { Geometry } from "./Geometry";
import { Mesh } from "./Mesh";
import { Material } from "./Material";
import { SkinnedGeometry } from "./Armature";
import { createUniqueId } from "../utils/createUniqueId";
import { Transform } from "./Transform";

export interface ISceneObject {
  id: string;
  parent: SceneObject | null;
  children: SceneObject[];
  isActive: boolean;
  transform: Transform;
  // NOTE this should be be kept in sync with transform.matrix
  worldMatrix: mat4;
}

export namespace ISceneObject {
  export const create = (): ISceneObject => {
    const transform = Transform.create();
    const worldMatrix = mat4.create();
    return {
      id: createUniqueId("scene-object"),
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

export interface Scene {
  root: SceneRoot;
  sceneObjects: SceneObject[];
}

export namespace Scene {
  export const create = (): Scene => {
    const sceneObject = ISceneObject.create();
    const root = sceneObject as SceneRoot;
    root.type = "root";
    return {
      root,
      sceneObjects: [],
    };
  };

  export const addChild = (
    scene: Scene,
    parent: SceneObject,
    sceneObject: SceneObject
  ) => {
    parent.children.push(sceneObject);
    scene.sceneObjects.push(sceneObject);
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
