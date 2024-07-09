import { Vertex } from "@lib/data/math/geometry/Vertex";
import { Camera } from "@lib/data/scene-objects/Camera";
import { Geometry } from "@lib/data/scene-objects/Geometry";
import { SceneCamera } from "@lib/data/scene-objects/SceneCamera";
import { SceneGeometry } from "@lib/data/scene-objects/SceneObject";
import { mat4, vec2 } from "gl-matrix";

const VERTEX_CLICK_RADIUS = 5;
const EDGE_CLICK_RADIUS = 5;

interface VertexRegion {
  position: vec2;
}

interface EdgeRegion {
  positionA: vec2;
  positionB: vec2;
}

interface TriRegion {
  positionA: vec2;
  positionB: vec2;
  positionC: vec2;
}

export interface ClickMap {
  vertices: VertexRegion[];
  edges: EdgeRegion[];
  tris: TriRegion[];
}

// TODO
// think about adding 'island' for click intersection testing?
//   for uvs
//   could also just select the tri then autoselect attached tris
type ClickIntersectionType = "vertex" | "edge" | "tri";
export interface ClickIntersection {
  type: ClickIntersectionType;
}

export namespace ClickMap {
  export const generate = (
    out: ClickMap,
    sceneCamera: SceneCamera,
    width: number,
    height: number,
    sceneGeometry: SceneGeometry,
    options: {
      // TODO is this possible or necessary
      frustrumCulling: boolean;
      // TODO do this somehow
      occlusionCulling: boolean;
    }
  ) => {
    const mpvMatrix = mat4.create();
    SceneCamera.toPVMatrix(mpvMatrix, sceneCamera, width, height);
    // TODO verify this multiplication is in the right order
    mat4.multiply(
      mpvMatrix,
      mpvMatrix,
      sceneGeometry.spatial.runtime.worldMatrix
    );

    sceneGeometry.data.vertices.forEach((vertex) => {
      Vertex.updateRuntime(vertex, mpvMatrix);
    });

    out.vertices = sceneGeometry.data.vertices.map((vertex) => ({
      position: vertex.runtime.screenCoords,
    }));

    out.edges = sceneGeometry.data.edges.map((edge) => ({
      positionA: edge[0].runtime.screenCoords,
      positionB: edge[1].runtime.screenCoords,
    }));

    out.tris = sceneGeometry.data.tris.map((tri) => ({
      positionA: tri.geo[0].runtime.screenCoords,
      positionB: tri.geo[1].runtime.screenCoords,
      positionC: tri.geo[2].runtime.screenCoords,
    }));
  };

  export const clickIntersects = (clickMap: ClickMap, position: vec2) => {
    // test against vertices
    // test against edges
    // test against tris
  };
}
