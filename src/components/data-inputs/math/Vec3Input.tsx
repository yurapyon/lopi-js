import { vec3 } from "gl-matrix";
import { Component } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";

export const Vec3Input: Component<
  {
    value: vec3;
    onChange: (v: vec3) => void;
  } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);
  return (
    <div class="flex flex-row gap-[1ch]" classList={classes}>
      <div
        onClick={() => {
          const newVec = [...props.value] as vec3;
          newVec[0] += 1;
          props.onChange(newVec);
        }}
      >
        {props.value[0]}
      </div>
      <div>{props.value[1]}</div>
      <div>{props.value[2]}</div>
    </div>
  );
};
