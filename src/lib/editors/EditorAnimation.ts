export class EditorAnimation {
  type: "animation" = "animation";
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  withContainer(container: HTMLDivElement) {
    // container.appendChild(this.canvas);
  }

  mouseDown(x: number, y: number) {}
}
