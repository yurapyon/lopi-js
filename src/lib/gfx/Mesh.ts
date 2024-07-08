import { Geometry } from "@lib/data/scene-objects/Geometry";
import { GL } from "./GL";

const vertex3dVertexAttributes = [
  // position
  GL.VertexAttributes.vec3,
  // uv
  GL.VertexAttributes.vec2,
];

export interface Mesh {
  vao: WebGLVertexArrayObject;
  vbo: WebGLBuffer;
  indices: WebGLBuffer;
  triCount: number;
}

export namespace Mesh {
  export const createFromGeometry = (
    gl: WebGL2RenderingContext,
    geometry: Geometry
  ): Mesh => {
    const vao = gl.createVertexArray();
    const vbo = gl.createBuffer();
    const indices = gl.createBuffer();
    if (!(vao && vbo && indices)) {
      // TODO error
      throw "error";
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    // gl.bufferData(gl.ARRAY_BUFFER, )

    gl.bindVertexArray(vao);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    GL.setupVertexAttributes(gl, vertex3dVertexAttributes);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices);
    // TODO how to handle indices
    gl.bindVertexArray(null);

    return {
      vao,
      vbo,
      indices,
      triCount: geometry.tris.length,
    };
  };
}
