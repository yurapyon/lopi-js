import { CanvasExt } from "../gfx/CanvasExt";
import { GL } from "../gfx/GL";

export class Editor3d {
  type: "3d" = "3d";
  id: string;
  canvas: HTMLCanvasElement;

  constructor(id: string) {
    this.id = id;
    this.canvas = document.createElement("canvas");
    this.canvas.width = 500;
    this.canvas.height = 500;
    // this.setContainer(container);
    CanvasExt.clear(this.canvas);

    const gl = this.canvas.getContext("webgl2");
    if (gl) {
      const tex = GL.makeTexture(gl, 10, 10);
      console.log(tex);
    }
  }

  withContainer(container: HTMLDivElement) {
    container.appendChild(this.canvas);
  }

  Component() {
    return null;
  }
}
