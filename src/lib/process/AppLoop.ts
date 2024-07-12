import { createUniqueId } from "@utils/createUniqueId";

export namespace AppLoop {
  export type CallbackFunction = (dt: number) => void;

  export interface Callback {
    id: string;
    fn: CallbackFunction;
  }

  let lastTime = 0;
  let loopShouldRun = false;
  const callbacks: Callback[] = [];

  const loop = (timeElapsed: number) => {
    const dt = timeElapsed - lastTime;

    callbacks.forEach((callback) => {
      callback.fn(dt);
    });

    lastTime = timeElapsed;

    if (loopShouldRun) {
      window.requestAnimationFrame(loop);
    }
  };

  export const startLoop = () => {
    loopShouldRun = true;
    lastTime = performance.now();
    window.requestAnimationFrame(loop);
  };

  export const stopLoop = () => {
    loopShouldRun = false;
  };

  export const addCallback = (fn: CallbackFunction) => {
    const id = createUniqueId("callback");
    callbacks.push({ id, fn });
    return id;
  };

  export const removeCallback = () => {
    // TODO
  };
}
