import { vec3 } from "gl-matrix";
import { Vertex } from "./Vertex";
import { Tri } from "./Tri";

export type Edge = [Vertex, Vertex] & {
  floatingVertices: Vertex[];
};

export namespace Edge {
  export const create = (vertex1: Vertex, vertex2: Vertex): Edge => {
    const ret = [vertex1, vertex2] as Edge;
    ret.floatingVertices = [];
    return ret;
  };

  /**
   * returns whether or not the edges have the same vertices
   */
  export const eq = (edge1: Edge, edge2: Edge) => {
    return (
      (edge1[0] === edge2[0] && edge1[1] === edge2[1]) ||
      (edge1[0] === edge2[1] && edge1[1] === edge2[0])
    );
  };

  export const split = (
    outVertex: Vertex,
    outEdges: [Edge, Edge],
    edge: Edge
  ) => {
    vec3.lerp(outVertex.position, edge[0].position, edge[1].position, 0.5);
    outEdges[0][0] = edge[0];
    outEdges[0][1] = outVertex;
    outEdges[1][0] = edge[1];
    outEdges[1][1] = outVertex;
  };

  export const splitFloating = (outVertex: Vertex, edge: Edge) => {
    vec3.lerp(outVertex.position, edge[0].position, edge[1].position, 0.5);
    outVertex.parentEdge = edge;
    edge.floatingVertices.push(outVertex);
  };

  export const flip = (outEdge: Edge, edge: Edge, tri1: Tri, tri2: Tri) => {
    outEdge[0] = Tri.otherVertex(tri1, edge);
    outEdge[1] = Tri.otherVertex(tri2, edge);
  };
}
