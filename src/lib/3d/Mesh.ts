export interface Mesh {
  vao: WebGLVertexArrayObject;
  vbo: WebGLBuffer;
  indices: WebGLBuffer;
  faceCount: number;
}
