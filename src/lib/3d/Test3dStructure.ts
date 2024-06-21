import { vec2, vec3 } from "gl-matrix";

// 0---1---4
// |  /|  /
// | / | /
// |/  |/
// 2---3

type Vertex = vec3;
const vertices: Vertex[] = [
  [0, 0, 0],
  [1, 0, 0],
  [0, 1, 0],
  [1, 1, 0],
  [2, 0, 0],
];

type Edge = [number, number];
const edges: Edge[] = [
  [0, 1],
  [1, 2],
  [2, 0],
  [2, 3],
  [1, 3],
  [1, 4],
  [3, 4],
];

type Tri = [number, number, number];
const tris: Tri[] = [
  [0, 1, 2],
  [1, 3, 2],
  [1, 4, 3],
];

const edgesAreEqual = (edge1: Edge, edge2: Edge) => {
  return (
    (edge1[0] === edge2[0] && edge1[1] === edge2[1]) ||
    (edge1[0] === edge2[1] && edge1[1] === edge2[0])
  );
};

const getEdgeWithVertexIndices = (vertexIdx: number) => {
  let ret: number[] = [];
  edges.forEach((edge, i) => {
    if (edge[0] === vertexIdx || edge[1] === vertexIdx) {
      ret.push(i);
    }
  });
  return ret;
};

const collapseEdge = (edgeIdx: number, deleteAtFirst: boolean) => {
  const edge = edges[edgeIdx];
  edges.splice(edgeIdx, 1);

  const trisToDelete = getTriOnEdgeIndices(edge);
  trisToDelete
    .sort((a, b) => b - a)
    .forEach((triIdx) => tris.splice(triIdx, 1));

  let deleteVertexIdx: number;
  let saveVertexIdx: number;

  if (deleteAtFirst) {
    deleteVertexIdx = edge[0];
    saveVertexIdx = edge[1];
  } else {
    deleteVertexIdx = edge[1];
    saveVertexIdx = edge[0];
  }

  vertices.splice(deleteVertexIdx, 1);

  const edgeWithVertexIndices = getEdgeWithVertexIndices(deleteVertexIdx);

  const edgesToDeleteIndices: number[] = [];
  for (let i = 0; i < edgeWithVertexIndices.length; i += 1) {
    const otherEdge = edges[edgeWithVertexIndices[i]];
    if (otherEdge[0] === deleteVertexIdx) {
      otherEdge[0] = saveVertexIdx;
    } else if (otherEdge[1] === deleteVertexIdx) {
      otherEdge[1] = saveVertexIdx;
    }

    for (let j = 0; j < edges.length; j += 1) {
      if (i !== j && edgesAreEqual(edges[j], otherEdge)) {
        edgesToDeleteIndices.push(i);
      }
    }
  }

  edgesToDeleteIndices
    .sort((a, b) => b - a)
    .forEach((edgeIdx) => edges.splice(edgeIdx, 1));

  for (let i = 0; i < edges.length; i += 1) {
    const edge = edges[i];
    if (edge[0] > deleteVertexIdx) {
      edge[0] -= 1;
    }
    if (edge[1] > deleteVertexIdx) {
      edge[1] -= 1;
    }
  }
};

const midpointBetweenVertices = (a: Vertex, b: Vertex) => {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2] as Vertex;
};

const splitEdge = (edgeIdx: number) => {
  const edge = edges[edgeIdx];

  const a = vertices[edge[0]];
  const b = vertices[edge[1]];
  const newVertex = midpointBetweenVertices(a, b);
  const newVertexIdx = vertices.length;
  vertices.push(newVertex);

  edges.splice(edgeIdx, 1);
  edges.push([edge[0], newVertexIdx]);
  edges.push([edge[1], newVertexIdx]);

  return newVertexIdx;
};

const getTriOnEdgeIndices = (edge: Edge) => {
  let ret = [];
  for (let i = 0; i < tris.length; i += 1) {
    const tri = tris[i];
    const triHasEdge =
      (tri[0] === edge[0] || tri[1] === edge[0] || tri[2] === edge[0]) &&
      (tri[0] === edge[1] || tri[1] === edge[1] || tri[2] === edge[1]);
    if (triHasEdge) {
      ret.push(i);
    }
  }
  return ret;
};

const getOppositeVertices = (edge: Edge) => {
  const triOnEdgeIndies = getTriOnEdgeIndices(edge);
  return triOnEdgeIndies.map((triOnEdgeIdx) => {
    const triOnEdge = tris[triOnEdgeIdx];
    for (const idx of triOnEdge) {
      if (idx === edge[0] || idx === edge[1]) {
        continue;
      } else {
        return idx;
      }
    }
    throw "error";
  });
};

const flipEdge = (edgeIdx: number) => {
  const edge = edges[edgeIdx];
  const vIdx = getOppositeVertices(edge);
  if (vIdx.length !== 2) {
    if (vIdx.length > 2) {
      // error
      console.error("invalid tri");
    } else if (vIdx.length < 2) {
      // nothing to flip
      console.warn("nothing to flip");
    }
    return;
  }

  edges[edgeIdx] = vIdx as [number, number];
};

const splitEdgeWithTris = (edgeIdx: number) => {
  const edge = edges[edgeIdx];
  const triOnEdgeIndices = getTriOnEdgeIndices(edge);
  const newVertexIdx = splitEdge(edgeIdx);

  let trisToDelete: number[] = [];
  let newTris: Tri[] = [];

  triOnEdgeIndices.forEach((triOnEdgeIdx) => {
    const tri = tris[triOnEdgeIdx];

    let replace = edge[0];
    const newTri1 = [...tri];
    for (let i = 0; i < 3; i += 1) {
      if (newTri1[i] === replace) {
        newTri1[i] = newVertexIdx;
      }
    }

    replace = edge[1];
    const newTri2 = [...tri];
    for (let i = 0; i < 3; i += 1) {
      if (newTri2[i] === replace) {
        newTri2[i] = newVertexIdx;
      }
    }

    trisToDelete.push(triOnEdgeIdx);
    newTris.push(newTri1 as [number, number, number]);
    newTris.push(newTri2 as [number, number, number]);
  });

  // NOTE we have to sort backwards we we delete things in order starting at the end
  trisToDelete
    .sort((a, b) => b - a)
    .forEach((deleteIdx) => tris.splice(deleteIdx, 1));
  tris.push(...newTris);
};

const splitTriCentroid = (triIdx: number) => {
  const tri = tris[triIdx];
  const a = vertices[tri[0]];
  const b = vertices[tri[1]];
  const c = vertices[tri[2]];
  const newVertex = [
    (a[0] + b[0] + c[0]) / 3,
    (a[1] + b[1] + c[1]) / 3,
    (a[2] + b[2] + c[2]) / 3,
  ];
  const newVertexIdx = vertices.length;
  vertices.push(newVertex as [number, number, number]);
  edges.push([tri[0], newVertexIdx]);
  edges.push([tri[1], newVertexIdx]);
  edges.push([tri[2], newVertexIdx]);
  tris.splice(triIdx, 1);
  tris.push([newVertexIdx, tri[1], tri[2]]);
  tris.push([tri[0], newVertexIdx, tri[2]]);
  tris.push([tri[0], tri[1], newVertexIdx]);
};

const hackyDeepCopy = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const run = () => {
  const position = vec3.fromValues(0, 0, 0);
  const x = {
    position,
    uv: vec2.fromValues(0, 0),
  };
  const y = {
    position,
    uv: vec2.fromValues(0, 1),
  };

  console.log(hackyDeepCopy([x, y]));
  x.position[2] = 1;
  console.log(hackyDeepCopy([x, y]));

  // merge();
  // flip(4);
  // splitEdgeWithTris(4);
  // splitTriCentroid(1);
  console.log(hackyDeepCopy([vertices, edges, tris]));
  collapseEdge(4, true);
  console.log(hackyDeepCopy([vertices, edges, tris]));
  // split();
};
