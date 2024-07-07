import { Component, JSX } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { Vec3Input } from "../math/Vec3Input";
import { Mutator } from "@utils/Mutator";
import { Transform } from "@lib/data/3d/Transform";

export const TransformInput: Component<
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
        <Vec3Input
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
        <Vec3Input
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
