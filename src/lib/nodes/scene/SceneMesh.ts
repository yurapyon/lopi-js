import { Geometry } from "@lib/3d/Geometry";
import { Mesh } from "@lib/3d/Mesh";
import { SkinnedGeometry } from "@lib/3d/Armature";
import { Spatial } from "./Spatial";

// export type MeshRenderMode = "wireframe" | "solid";

export interface SceneMesh extends Spatial {
  type: "mesh";
  geometry: Geometry;
  mesh: Mesh;
}

export namespace SceneMesh {
  export const render = (gl: WebGL2RenderingContext, sceneMesh: SceneMesh) => {
    /*
    gl.useProgram(sceneMesh.material.program);
    gl.uniformMatrix4fv(
      sceneMesh.material.locations.model,
      false,
      sceneMesh.worldMatrix
    );
    */

    gl.bindBuffer(gl.ARRAY_BUFFER, sceneMesh.mesh.vao);
    gl.drawElements(gl.TRIANGLES, sceneMesh.mesh.triCount, gl.UNSIGNED_INT, 0);
  };
}

export interface SceneSkinnedMesh extends Spatial {
  type: "skinned-mesh";
  geometry: SkinnedGeometry;
  mesh: Mesh;
  // material: Material;
  // renderMode: MeshRenderMode;
}
