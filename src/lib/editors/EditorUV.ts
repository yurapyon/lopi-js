export class EditorUV {
  type: "uv" = "uv";
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  withContainer(container: HTMLDivElement) {
    // container.appendChild(this.canvas);
  }

  mouseDown(x: number, y: number) {}
}
