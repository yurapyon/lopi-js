import { vec3 } from "gl-matrix";
import { Edge } from "./Edge";

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
