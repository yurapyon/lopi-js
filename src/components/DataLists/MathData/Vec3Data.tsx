import { vec3 } from "gl-matrix";
import { Component } from "solid-js";
import { ClassProps, setupClassProps } from "src/utils/ClassProps";

export const Vec3Data: Component<
  {
    value: vec3;
    onChange: () => void;
  } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);
  return (
    <div class="flex flex-row gap-[1ch]" classList={classes}>
      <div>{props.value[0]}</div>
      <div>{props.value[1]}</div>
      <div>{props.value[2]}</div>
    </div>
  );
};
