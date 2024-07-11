import { Segment, binarySearch, getSegment } from "@utils/binarySearch";

export interface Keyframe<T> {
  index: number;
  value: T;
}

export interface AnimationBase<
  T extends string,
  InterpolationOptions extends string,
  KeyframeType
> {
  type: T;
  interpolationType: InterpolationOptions;
  keyframes: Keyframe<KeyframeType>[];
  runtime: {
    lastSegment: Segment<Keyframe<KeyframeType>>;
    frameAt: number;
  };
}

export type NumberAnimation = AnimationBase<
  "number",
  "step" | "linear",
  number
>;

/*
export namespace NumberAnimation {
  export const readAt = (
    out: number,
    animation: NumberAnimation,
    isKeyframe: boolean,
    at: number
  ) => {
    if (animation.interpolationType === "step") {
      // const segment = animation.keyframes.getSegment(at);
      // out = segment.previousValue.value;
    }
  };
}
  */

export type CameraAnimation = AnimationBase<
  "number",
  "step" | "linear",
  number
>;

export type Animation = NumberAnimation | CameraAnimation;

export namespace Animation {
  export function jumpTo(animation: Animation, frameAt: number) {
    animation.runtime.frameAt = frameAt;
    const segment = getSegment(animation.keyframes, (testValue) => {
      return frameAt - testValue.index;
    });
    animation.runtime.lastSegment = segment;
  }

  export function advanceFrame(animation: Animation) {
    animation.runtime.frameAt += 1;
    // TODO
    // determine keyframe
  }
}
