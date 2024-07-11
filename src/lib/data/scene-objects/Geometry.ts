import { Mesh } from "@lib/gfx/Mesh";
import { Tri } from "../math/geometry/Tri";
import { Vertex } from "../math/geometry/Vertex";
import { Edge } from "../math/geometry/Edge";

export interface Geometry {
  vertices: Vertex[];
  edges: Edge[];
  tris: Tri[];
}

export interface UV {
  parentGeo: Geometry;
  geo: Geometry;
  geoMap: {
    vertices: number[][];
    edges: number[][];
    tris: number[][];
  };
}

export namespace Geometry {
  // dissolve vertex
}

export interface Model {
  geometry: Geometry;
  uvs: UV[];
  runtime: {
    mesh: Mesh;
  };
}
