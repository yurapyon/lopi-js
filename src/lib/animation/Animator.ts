import { Animation } from "./Animation";
import { Ticker } from "./Ticker";

export interface Animator {
  animations: Animation[];
  ticker: Ticker;
}

export namespace Animator {
  export const accumulateTime = (animator: Animator, time: number) => {
    Ticker.accumulateTime(animator.ticker, time, () => {
      animator.animations.forEach((animation) => {
        Animation.advanceFrame(animation);
      });
    });
  };

  export const jumpTo = (animator: Animator, frameAt: number) => {
    animator.animations.forEach((animation) => {
      Animation.jumpTo(animation, frameAt);
    });
    Ticker.reset(animator.ticker);
  };
}
