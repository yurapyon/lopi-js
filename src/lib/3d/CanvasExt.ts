export namespace CanvasExt {
  export const clear = (canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };
}

export namespace GL {
  export const SIZE_OF_FLOAT = 4;

  export const makeTexture = (
    gl: WebGLRenderingContext,
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
    gl: WebGLRenderingContext,
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
}
