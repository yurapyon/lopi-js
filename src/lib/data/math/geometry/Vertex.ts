import { mat4, vec2, vec3 } from "gl-matrix";
import { Edge } from "./Edge";

export interface Vertex {
  position: vec3;
  parentEdge: Edge | null;
  runtime: {
    screenCoords: vec2;
  };
}

export namespace Vertex {
  export const create = (position: vec3): Vertex => {
    return {
      position,
      parentEdge: null,
      runtime: {
        screenCoords: vec2.create(),
      },
    };
  };

  export const updateRuntime = (vertex: Vertex, mpvMatrix: mat4) => {
    // TODO
    // project vertex to screen with mpvMatrix
  };
}
