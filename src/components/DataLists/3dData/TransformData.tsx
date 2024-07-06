import { Component, JSX } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { Vec3Data } from "../MathData/Vec3Data";
import { Transform } from "@lib/3d/Transform";
import { Mutator } from "@utils/Mutator";

export const TransformData: Component<
  {
    transform: Transform;
    mutateTransform: Mutator<Transform>;
  } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);
  return (
    <div class="flex flex-col" classList={classes}>
      <div class="flex flex-row gap-[1ch]">
        p
        <Vec3Data
          value={props.transform.position}
          onChange={(newVec) => {
            props.mutateTransform((transform) => {
              transform.position = newVec;
            });
          }}
        />
      </div>
      <div class="flex flex-row gap-[1ch]">
        s
        <Vec3Data
          value={props.transform.scale}
          onChange={(newVec) => {
            props.mutateTransform((transform) => {
              transform.scale = newVec;
            });
          }}
        />
      </div>
    </div>
  );
};
