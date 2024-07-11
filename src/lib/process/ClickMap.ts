import { Vertex } from "@lib/data/math/geometry/Vertex";
import { Camera } from "@lib/data/scene-objects/Camera";
import { Geometry } from "@lib/data/scene-objects/Geometry";
import { SceneCamera } from "@lib/data/scene-objects/SceneCamera";
import { SceneGeometry } from "@lib/data/scene-objects/SceneObject";
import { mat4, vec2 } from "gl-matrix";

const VERTEX_CLICK_RADIUS = 5;
const EDGE_CLICK_RADIUS = 5;

interface VertexRegion {
  index: number;
  position: vec2;
}

interface EdgeRegion {
  index: number;
  positionA: vec2;
  positionB: vec2;
}

interface TriRegion {
  index: number;
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
  index: number;
}

export namespace ClickMap {
  const fromGeometry = (out: ClickMap, geometry: Geometry) => {
    out.vertices = geometry.vertices.map((vertex, i) => ({
      index: i,
      position: vertex.runtime.screenCoords,
    }));

    out.edges = geometry.edges.map((edge, i) => ({
      index: i,
      positionA: edge[0].runtime.screenCoords,
      positionB: edge[1].runtime.screenCoords,
    }));

    out.tris = geometry.tris.map((tri, i) => ({
      index: i,
      positionA: tri[0].runtime.screenCoords,
      positionB: tri[1].runtime.screenCoords,
      positionC: tri[2].runtime.screenCoords,
    }));
  };

  export const generateFromSceneCamera = (
    out: ClickMap,
    sceneGeometry: SceneGeometry,
    sceneCamera: SceneCamera,
    width: number,
    height: number,
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

    fromGeometry(out, sceneGeometry.data);
  };

  export const generateFromZeroToOne = (
    out: ClickMap,
    sceneGeometry: SceneGeometry,
    width: number,
    height: number,
    options: {}
  ) => {
    // TODO set up mpv matrix
    const mpvMatrix = mat4.create();

    sceneGeometry.data.vertices.forEach((vertex) => {
      Vertex.updateRuntime(vertex, mpvMatrix);
    });

    fromGeometry(out, sceneGeometry.data);
  };

  export const pointIntersects = (clickMap: ClickMap, point: vec2) => {
    // TODO could use an octree but maybe not needed
    const vertexIntersctions: ClickIntersection[] = clickMap.vertices
      .filter((vertex) => {
        vec2.distance(vertex.position, point) < VERTEX_CLICK_RADIUS;
      })
      .map((vertexRegion) => ({ type: "vertex", index: vertexRegion.index }));

    const edgeIntersections: ClickIntersection[] = clickMap.edges
      .filter((edge) => {
        // TODO
        // 'line intersects circle' might be easier than 'point intersects cylinder'
        return false;
      })
      .map((edgeRegion) => ({
        type: "edge",
        index: edgeRegion.index,
      }));

    const triIntersections: ClickIntersection[] = clickMap.tris
      .filter((tri) => {
        // TODO
        // check point in tri
        return false;
      })
      .map((triRegion) => ({ type: "tri", index: triRegion.index }));

    return {
      vertexIntersctions,
      edgeIntersections,
      triIntersections,
    };
  };
}
