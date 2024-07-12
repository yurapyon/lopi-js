import { Vertex } from "@lib/data/math/geometry/Vertex";
import { Geometry } from "@lib/data/scene-objects/Geometry";
import { SceneCamera } from "@lib/data/scene-objects/SceneCamera";
import { SceneGeometry } from "@lib/data/scene-objects/SceneObject";
import {
  centroidOfTriangle,
  lineSegmentIntersectsCircle,
  pointInsersectsCircle,
  pointIntersectsTriangle,
} from "@utils/math";
import { mat4, vec2 } from "gl-matrix";

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
  centroid: vec2 | null;
}

export interface ClickMap {
  vertices: VertexRegion[];
  edges: EdgeRegion[];
  tris: TriRegion[];
  useTriCentroids: boolean;
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
  export const create = (): ClickMap => {
    return {
      vertices: [],
      edges: [],
      tris: [],
      useTriCentroids: false,
    };
  };

  const fromGeometry = (
    out: ClickMap,
    geometry: Geometry,
    useTriCentroids: boolean
  ) => {
    out.vertices = geometry.vertices.map((vertex, i) => ({
      index: i,
      position: vertex.runtime.screenCoords,
    }));

    out.edges = geometry.edges.map((edge, i) => ({
      index: i,
      positionA: edge[0].runtime.screenCoords,
      positionB: edge[1].runtime.screenCoords,
    }));

    out.tris = geometry.tris.map((tri, i) => {
      const positionA = tri[0].runtime.screenCoords;
      const positionB = tri[1].runtime.screenCoords;
      const positionC = tri[2].runtime.screenCoords;
      return {
        index: i,
        positionA,
        positionB,
        positionC,
        centroid: useTriCentroids
          ? centroidOfTriangle(positionA, positionB, positionC)
          : null,
      };
    });

    out.useTriCentroids = useTriCentroids;
  };

  export const generateFromSceneCamera = (
    out: ClickMap,
    sceneGeometry: SceneGeometry,
    sceneCamera: SceneCamera,
    width: number,
    height: number,
    options?: {
      // TODO is this possible or necessary
      frustrumCulling?: boolean;
      // TODO do this somehow
      occlusionCulling?: boolean;
      useTriCentroids?: boolean;
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

    fromGeometry(out, sceneGeometry.data, !!options?.useTriCentroids);
  };

  export const generateFromZeroToOne = (
    out: ClickMap,
    sceneGeometry: SceneGeometry,
    width: number,
    height: number,
    options?: { useTriCentroids?: boolean }
  ) => {
    // TODO set up mpv matrix
    const mpvMatrix = mat4.create();

    sceneGeometry.data.vertices.forEach((vertex) => {
      Vertex.updateRuntime(vertex, mpvMatrix);
    });

    fromGeometry(out, sceneGeometry.data, !!options?.useTriCentroids);
  };

  export const pointIntersects = (
    clickMap: ClickMap,
    point: vec2,
    options?: {
      clickRadii?: {
        vertex?: number;
        edge?: number;
        centroid?: number;
      };
    }
  ) => {
    const DEFAULT_VERTEX_CLICK_RADIUS = 5;
    const DEFAULT_EDGE_CLICK_RADIUS = 5;
    const DEFAULT_TRI_CENTROID_CLICK_RADIUS = DEFAULT_VERTEX_CLICK_RADIUS;

    // TODO could use an octree but maybe not needed
    const vertexIntersctions: ClickIntersection[] = clickMap.vertices
      .filter((vertex) => {
        return pointInsersectsCircle(
          vertex.position,
          point,
          options?.clickRadii?.vertex || DEFAULT_VERTEX_CLICK_RADIUS
        );
      })
      .map((vertexRegion) => ({ type: "vertex", index: vertexRegion.index }));

    const edgeIntersections: ClickIntersection[] = clickMap.edges
      .filter((edge) => {
        return lineSegmentIntersectsCircle(
          edge.positionA,
          edge.positionB,
          point,
          options?.clickRadii?.edge || DEFAULT_EDGE_CLICK_RADIUS
        );
      })
      .map((edgeRegion) => ({
        type: "edge",
        index: edgeRegion.index,
      }));

    const triIntersections: ClickIntersection[] = clickMap.tris
      .filter((tri) => {
        if (clickMap.useTriCentroids) {
          return pointInsersectsCircle(
            // NOTE, enforcing it isnt null
            tri.centroid!,
            point,
            options?.clickRadii?.centroid || DEFAULT_TRI_CENTROID_CLICK_RADIUS
          );
        } else {
          return pointIntersectsTriangle(
            point,
            tri.positionA,
            tri.positionB,
            tri.positionC
          );
        }
      })
      .map((triRegion) => ({ type: "tri", index: triRegion.index }));

    return {
      vertexIntersctions,
      edgeIntersections,
      triIntersections,
    };
  };
}
