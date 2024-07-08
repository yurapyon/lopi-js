import { Edge } from "./Edge";
import { Vertex } from "./Vertex";

export type Tri = [Vertex, Vertex, Vertex] & {
  edge01: Edge;
  edge12: Edge;
  edge20: Edge;
};

export namespace Tri {
  export const create = (
    vertex1: Vertex,
    vertex2: Vertex,
    vertex3: Vertex
  ): Tri => {
    const ret = [vertex1, vertex2, vertex3] as Tri;
    ret.edge01 = Edge.create(vertex1, vertex2);
    ret.edge12 = Edge.create(vertex2, vertex3);
    ret.edge20 = Edge.create(vertex3, vertex1);
    return ret;
  };

  export const otherVertex = (tri: Tri, edge: Edge) => {
    const has0 = edge.some((vertex) => vertex === tri[0]);
    const has1 = edge.some((vertex) => vertex === tri[1]);
    const has2 = edge.some((vertex) => vertex === tri[2]);
    if (!has0) {
      return tri[0];
    } else if (!has1) {
      return tri[1];
    } else if (!has2) {
      return tri[2];
    }
    // TODO better error
    throw "error";
  };
}
