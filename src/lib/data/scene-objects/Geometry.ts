import { vec3 } from "gl-matrix";

export interface Vertex {
  position: vec3;
  parentEdge: Edge | null;
}

export namespace Vertex {
  export const create = (position: vec3): Vertex => {
    return {
      position,
      parentEdge: null,
    };
  };
}

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

// NOTE
// UV tris use the same vertex type as geo tris even though they are 2d
//   (z value is ignored)
//   this makes structuring the code easier but
//     uses more memory
//       (uv tri positions are technically vec2s instead of vec3s)
//     assumes math for vec3s works the same as its vec2 counterparts if vec3.z === 0
//       // TODO look into this
export interface TriWithUVs {
  geo: Tri;
  uvs: Tri[];
}

export interface Geometry {
  vertices: Vertex[];
  edges: Edge[];
  tris: TriWithUVs[];
  uvMapIds: string[];
}

export namespace Geometry {
  // dissolve vertex
}
