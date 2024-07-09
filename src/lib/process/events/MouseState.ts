import { vec2 } from "gl-matrix";

export interface MouseState {
  lastEvent: MouseEvent;
  wrapped: boolean;
  virtualX: number;
  virtualY: number;
}

export namespace MouseState {
  export const createEmpty = (): MouseState => {
    return {
      lastEvent: undefined as unknown as MouseEvent,
      wrapped: false,
      virtualX: 0,
      virtualY: 0,
    };
  };

  export const processMouseEvent = (mouseState: MouseState, e: MouseEvent) => {
    mouseState.lastEvent = e;
    mouseState.virtualX += e.movementX;
    mouseState.virtualY += e.movementY;
  };

  export const positionInLastElement = (out: vec2, mouseState: MouseState) => {
    const e = mouseState.lastEvent;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const outX = e.clientX - rect.left;
    const outY = e.clientY - rect.top;
    out[0] = Math.min(Math.max(0, outX), rect.right);
    out[1] = Math.min(Math.max(0, outY), rect.bottom);
  };
}
