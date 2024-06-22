import { vec2, vec3 } from "gl-matrix";

// NOTE UVVertices, edges, tris can just be created on unwrap

export interface Vertex {
  position: vec3;
  parentEdge: Edge | null;
  linkedUVVertices: UVVertex[];
}

export interface UVVertex {
  position: vec2;
  linkedVertex: Vertex;
}

export namespace Vertex {
  export const create = (position: vec3): Vertex => {
    return {
      position,
      parentEdge: null,
      linkedUVVertices: [],
    };
  };
}

export type Edge = [Vertex, Vertex] & {
  floatingVertices: Vertex[];
  linkedUVEdges: UVEdge[];
};

export type UVEdge = [UVVertex, UVVertex] & {
  linkedEdge: Edge;
};

export namespace Edge {
  export const create = (vertex1: Vertex, vertex2: Vertex): Edge => {
    const ret = [vertex1, vertex2] as Edge;
    ret.floatingVertices = [];
    ret.linkedUVEdges = [];
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
  linkedUVTris: UVTri[];
};

export type UVTri = [UVVertex, UVVertex, UVVertex] & {
  edge01: UVEdge;
  edge12: UVEdge;
  edge20: UVEdge;
  linkedTri: Tri;
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
    ret.linkedUVTris = [];
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

export interface Geometry {
  vertices: Vertex[];
  edges: Edge[];
  tris: Tri[];
  UVMeshes: UVGeometry[];
}

export interface UVGeometry {
  vertices: UVVertex[];
  edges: UVEdge[];
  tris: UVTri[];
  linkedGeometry: Geometry;
}

export namespace Geometry {
  // dissolve vertex
}
