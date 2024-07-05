import { Component, JSX } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { Vec3Data } from "../MathData/Vec3Data";
import { Transform } from "@lib/3d/Transform";

export const TransfromData: Component<
  {
    transform: Transform;
    onChange: (updateObject: Partial<Transform>) => void;
  } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);
  return (
    <div class="flex flex-col" classList={classes}>
      <div class="flex flex-row gap-[1ch]">
        p
        <Vec3Data value={props.transform.position} onChange={() => {}} />
      </div>
      <div class="flex flex-row gap-[1ch]">
        s
        <Vec3Data value={props.transform.scale} onChange={() => {}} />
      </div>
    </div>
  );
};
