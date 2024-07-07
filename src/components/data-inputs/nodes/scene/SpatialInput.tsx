import { Component } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { TransformInput } from "../../3d/TransformInput";
import { Mutator } from "@utils/Mutator";
import { Spatial } from "@lib/nodes/scene/Spatial";

export const SpatialInput: Component<
  {
    spatial: Spatial;
    mutateSpatial: Mutator<Spatial>;
  } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);

  return (
    <div class="flex flex-col" classList={classes}>
      <div class="flex flex-row gap-[1ch]">
        <div>{props.spatial.isActive ? "O" : "X"}</div>
        <div>{props.spatial.name}</div>
      </div>
      <TransformInput
        transform={props.spatial.transform}
        mutateTransform={(mutateTransform) => {
          props.mutateSpatial((spatial) => {
            mutateTransform(spatial.transform);
          });
        }}
      />
    </div>
  );
};
