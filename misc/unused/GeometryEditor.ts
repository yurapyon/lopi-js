import { vec2, vec3 } from "gl-matrix";
import { VertexAttributes } from "./Vertex";

export interface GeoVertex {
  position: vec3;
  parentEdge: GeoEdge | null;
  linkedUVVertices: UVVertex[];
}

const createGeoVertex = (position: vec3) => {
  return {
    position,
    parentEdge: null,
    linkedUVVertices: [],
  } as GeoVertex;
};

interface GeoEdge {
  0: GeoVertex;
  1: GeoVertex;
  floatingVertices: GeoVertex[];
  linkedUVEdges: UVEdge[];
}

const createGeoEdge = (geoVertices: [GeoVertex, GeoVertex]) => {
  return {
    0: geoVertices[0],
    1: geoVertices[1],
    floatingVertices: [],
    linkedUVEdges: [],
  } as GeoEdge;
};

// ==

export interface UVVertex {
  geoVertex: GeoVertex;
  tex_0: vec2;
  tex_1: vec2;
}

const createUVVertexFromGeoVertex = (geoVertex: GeoVertex) => {
  const ret = {
    geoVertex,
    tex_0: vec2.create(),
    tex_1: vec2.create(),
  } as UVVertex;
  geoVertex.linkedUVVertices.push(ret);
  return ret;
};

interface UVEdge {
  geoEdge: GeoEdge;
  0: UVVertex;
  1: UVVertex;
}

const createUVEdgeFromGeoEdge = (
  geoEdge: GeoEdge,
  possibleUVVertices: UVVertex[]
) => {
  const uvVertex0 = possibleUVVertices.find(
    (uvVertex) => uvVertex.geoVertex === geoEdge[0]
  );
  const uvVertex1 = possibleUVVertices.find(
    (uvVertex) => uvVertex.geoVertex === geoEdge[1]
  );
  if (!(uvVertex0 && uvVertex1)) {
    // TODO error
    return null;
  }

  const ret = {
    geoEdge,
    0: uvVertex0,
    1: uvVertex1,
  } as UVEdge;
  geoEdge.linkedUVEdges.push(ret);
  return ret;
};

// Tris are always 1to1 with geo and uv
interface Tri {
  geo: [GeoVertex, GeoVertex, GeoVertex];
  uv: [UVVertex, UVVertex, UVVertex];
}

const createTri = (
  geoVertices: [GeoVertex, GeoVertex, GeoVertex],
  geoEdges: [GeoEdge, GeoEdge, GeoEdge]
) => {
  const uvVertices = geoVertices.map(createUVVertexFromGeoVertex);
  const uvEdges = geoEdges.map((geoEdge) =>
    createUVEdgeFromGeoEdge(geoEdge, uvVertices)
  );

  if (uvEdges.some((uvEdge) => uvEdge === null)) {
    return null;
  }

  return {
    uvVertices,
    uvEdges: uvEdges as UVEdge[],
    tri: {
      geo: [...geoVertices],
      uv: uvVertices,
    } as Tri,
  };
};

const vertexVertexAttributes = [
  VertexAttributes.vec3,
  VertexAttributes.vec2,
  VertexAttributes.vec2,
];

export const makePyramid = () => {
  // Y is up
  // right handed, z+ is away from camera
  const geoVertices = (
    [
      [0, 1, 0],
      [1, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
      [-1, 0, 1],
    ] as vec3[]
  ).map(createGeoVertex);

  const geoEdges = (
    [
      [geoVertices[0], geoVertices[1]],
      [geoVertices[0], geoVertices[2]],
      [geoVertices[0], geoVertices[3]],
      [geoVertices[0], geoVertices[4]],

      [geoVertices[1], geoVertices[2]],
      [geoVertices[2], geoVertices[3]],
      [geoVertices[3], geoVertices[4]],
      [geoVertices[4], geoVertices[1]],

      [geoVertices[1], geoVertices[3]],
    ] as [GeoVertex, GeoVertex][]
  ).map(createGeoEdge);

  const tris = [
    createTri(
      [geoVertices[0], geoVertices[1], geoVertices[2]],
      [geoEdges[0], geoEdges[4], geoEdges[1]]
    ),
    createTri(
      [geoVertices[0], geoVertices[2], geoVertices[3]],
      [geoEdges[1], geoEdges[5], geoEdges[2]]
    ),
    createTri(
      [geoVertices[0], geoVertices[3], geoVertices[4]],
      [geoEdges[2], geoEdges[6], geoEdges[3]]
    ),
    createTri(
      [geoVertices[0], geoVertices[4], geoVertices[1]],
      [geoEdges[3], geoEdges[7], geoEdges[0]]
    ),
    createTri(
      [geoVertices[1], geoVertices[4], geoVertices[3]],
      [geoEdges[7], geoEdges[6], geoEdges[8]]
    ),
    createTri(
      [geoVertices[1], geoVertices[3], geoVertices[2]],
      [geoEdges[8], geoEdges[5], geoEdges[4]]
    ),
  ];

  return { geoEdges, geoVertices, tris };
};
