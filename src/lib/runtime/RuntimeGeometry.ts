import { Mesh } from "@lib/gfx/Mesh";

export interface RuntimeGeometry {
  mesh: Mesh;
}

/*
export namespace SceneMesh {
  export const render = (gl: WebGL2RenderingContext, sceneMesh: SceneMesh) => {
    // gl.useProgram(sceneMesh.material.program);
    // gl.uniformMatrix4fv(
      // sceneMesh.material.locations.model,
      // false,
      // sceneMesh.worldMatrix
    // );

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
*/
