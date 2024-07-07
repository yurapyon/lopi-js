import { MouseState } from "./events/MouseState";

export namespace Events {
  export const processMouseEvent = (mouseState: MouseState, e: MouseEvent) => {
    mouseState.lastEvent = e;
    mouseState.virtualX += e.movementX;
    mouseState.virtualY += e.movementY;
  };

  export const startPointerLock = (
    mouseState: MouseState,
    element: HTMLElement,
    onUserExit: () => void
  ) => {
    document.onpointerlockchange = () => {
      if (!document.pointerLockElement) {
        mouseState.wrapped = false;
        onUserExit();
      }
    };

    element.requestPointerLock();
    // TODO
    // mouseState.virtualX = ;
    // mouseState.virtualY = ;
    mouseState.wrapped = true;
  };

  export const exitPointerLock = (mouseState: MouseState) => {
    document.exitPointerLock();
    mouseState.wrapped = false;
  };
}
