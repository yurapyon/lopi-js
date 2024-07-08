import { Mesh } from "@lib/gfx/Mesh";
import { Tri } from "../math/geometry/Tri";
import { Vertex } from "../math/geometry/Vertex";
import { Edge } from "../math/geometry/Edge";

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
  uvImageIds: string[];
  runtime: {
    mesh: Mesh;
  };
}

export namespace Geometry {
  // dissolve vertex
}
