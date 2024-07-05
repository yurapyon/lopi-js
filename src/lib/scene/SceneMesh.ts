import { Geometry } from "@lib/3d/Geometry";
import { ISceneObject } from "./SceneObject";
import { Mesh } from "@lib/3d/Mesh";
import { Material } from "@lib/3d/Material";
import { SkinnedGeometry } from "@lib/3d/Armature";

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
