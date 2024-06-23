import { GL } from "../gfx/GL";

export interface Material {
  program: WebGLProgram;
  locations: {
    model: WebGLUniformLocation | null;
    view: WebGLUniformLocation | null;
    projection: WebGLUniformLocation | null;
  };
}

export namespace Material {
  export const create = (
    gl: WebGL2RenderingContext,
    vertString: string,
    fragString: string
  ): Material => {
    const program = GL.makeProgram(gl, vertString, fragString);
    if (!program) {
      // TODO error handling
      throw "error";
    }
    const model = gl.getUniformLocation(program, "_model");
    const view = gl.getUniformLocation(program, "_view");
    const projection = gl.getUniformLocation(program, "_projection");
    return {
      program,
      locations: {
        model,
        view,
        projection,
      },
    };
  };
}
