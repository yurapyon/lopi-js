export namespace CanvasExtensions {
  export const clear = (canvas: HTMLCanvasElement) => {
    const gl = canvas.getContext("webgl2");
    if (!gl) return;
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };
}
