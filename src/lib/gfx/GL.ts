export namespace GL {
  const GL_FLOAT = 5126;
  const SIZE_OF_FLOAT = 4;

  export const makeTexture = (
    gl: WebGL2RenderingContext,
    width: number,
    height: number
  ) => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      width,
      height,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );
    gl.bindTexture(gl.TEXTURE_2D, null);
    return tex;
  };

  export const makeProgram = (
    gl: WebGL2RenderingContext,
    vertString: string,
    fragString: string
  ) => {
    const vert = gl.createShader(gl.VERTEX_SHADER);
    const frag = gl.createShader(gl.FRAGMENT_SHADER);
    const prog = gl.createProgram();
    if (!prog || !vert || !frag) return;

    // TODO better error checking and unlink things when no ncessary

    gl.shaderSource(vert, vertString);
    gl.compileShader(vert);
    // console.log("vert SIL", gl.getShaderInfoLog(vert));

    gl.shaderSource(frag, fragString);
    gl.compileShader(frag);
    // console.log("frag SIL", gl.getShaderInfoLog(frag));

    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    return prog;
  };

  interface VertexAttribute {
    type: number;
    size: number;
    count: number;
  }

  export namespace VertexAttributes {
    export const float: VertexAttribute = {
      type: GL_FLOAT,
      size: SIZE_OF_FLOAT,
      count: 1,
    };
    export const vec2: VertexAttribute = {
      type: GL_FLOAT,
      size: SIZE_OF_FLOAT,
      count: 2,
    };
    export const vec3: VertexAttribute = {
      type: GL_FLOAT,
      size: SIZE_OF_FLOAT,
      count: 3,
    };
  }

  const calculateVertexSize = (vertexAttributes: VertexAttribute[]) => {
    return vertexAttributes.reduce((acc, vertexAttribute) => {
      return acc + vertexAttribute.size * vertexAttribute.count;
    }, 0);
  };

  export const setupVertexAttributes = (
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
}
