import { vec2, vec3 } from "gl-matrix";
import { GL } from "@utils/gfx/GL";

interface VertexAttribute {
  type: number;
  size: number;
  count: number;
}

const setupVertexAttributes = (
  gl: WebGL2RenderingContext,
  vertexAttributes: VertexAttribute[]
) => {
  const stride = calculateVertexSize(vertexAttributes);
  let offset = 0;
  vertexAttributes.forEach((vertexAttribute, i) => {
    gl.enableVertexAttribArray(i);
    gl.vertexAttribPointer(
      i,
      vertexAttribute.count,
      vertexAttribute.type,
      false,
      stride,
      offset
    );
    offset += vertexAttribute.size * vertexAttribute.count;
  });
};

export namespace VertexAttributes {
  export const float: VertexAttribute = {
    type: 5126,
    size: GL.SIZE_OF_FLOAT,
    count: 1,
  };
  export const vec2: VertexAttribute = {
    type: 5126,
    size: GL.SIZE_OF_FLOAT,
    count: 2,
  };
  export const vec3: VertexAttribute = {
    type: 5126,
    size: GL.SIZE_OF_FLOAT,
    count: 3,
  };
}

const calculateVertexSize = (vertexAttributes: VertexAttribute[]) => {
  return vertexAttributes.reduce((acc, vertexAttribute) => {
    return acc + vertexAttribute.size * vertexAttribute.count;
  }, 0);
};

//

interface Vertex {
  position: vec3;
  weightIndex: number;
  weightAmount: number;
  tex_0: vec2;
  tex_1: vec2;

  // whenever a face is created using this vertex you need to add the new vertex to this array
  linkedVertices: Vertex[];
}

export interface Vertex3d {
  position: vec3;
  // TODO get rid of normals
  normal: vec3;
  tex_0: vec2;
  tex_1: vec2;
  weightIndex: number;
  weightAmount: number;
}

const vertex3dVertexAttributes = [
  VertexAttributes.vec3,
  VertexAttributes.vec3,
  VertexAttributes.vec2,
  VertexAttributes.vec2,
  VertexAttributes.float,
  VertexAttributes.float,
];

export const verticesToFloatArray = (vertices: Vertex3d[]) => {
  const vertexFloatCount =
    calculateVertexSize(vertex3dVertexAttributes) / GL.SIZE_OF_FLOAT;
  const ret = new Float32Array(vertexFloatCount * vertices.length);
  vertices.forEach((vertex, i) => {
    ret[i * vertexFloatCount + 0] = vertex.position[0];
    ret[i * vertexFloatCount + 1] = vertex.position[1];
    ret[i * vertexFloatCount + 2] = vertex.position[2];
    ret[i * vertexFloatCount + 3] = vertex.normal[0];
    ret[i * vertexFloatCount + 4] = vertex.normal[1];
    ret[i * vertexFloatCount + 5] = vertex.normal[2];
    ret[i * vertexFloatCount + 6] = vertex.tex_0[0];
    ret[i * vertexFloatCount + 7] = vertex.tex_0[1];
    ret[i * vertexFloatCount + 8] = vertex.tex_1[0];
    ret[i * vertexFloatCount + 9] = vertex.tex_1[1];
    ret[i * vertexFloatCount + 10] = vertex.weightIndex;
    ret[i * vertexFloatCount + 11] = vertex.weightAmount;
  });
  console.log(ret);
  return ret;
};

export const verticesToMesh = (
  gl: WebGL2RenderingContext,
  vertices: Vertex3d[]
) => {
  const vbo = gl.createBuffer();
  if (!vbo) return { vao: null, vbo: null };

  const vao = gl.createVertexArray();
  if (!vao) return { vao: null, vbo };

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    verticesToFloatArray(vertices),
    gl.STATIC_DRAW
  );

  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  setupVertexAttributes(gl, vertex3dVertexAttributes);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindVertexArray(null);

  return { vao, vbo };
};
