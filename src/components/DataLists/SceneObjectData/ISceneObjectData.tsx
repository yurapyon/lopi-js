import { Component } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { TransformData } from "../3dData/TransformData";
import { ISceneObject } from "@lib/scene/SceneObject";
import { Mutator } from "@utils/Mutator";

export const ISceneObjectData: Component<
  {
    iSceneObject: ISceneObject;
    mutateISceneObject: Mutator<ISceneObject>;
  } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);

  return (
    <div class="flex flex-col" classList={classes}>
      <div class="flex flex-row gap-[1ch]">
        <div>{props.iSceneObject.isActive ? "O" : "X"}</div>
        <div>{props.iSceneObject.name}</div>
      </div>
      <TransformData
        transform={props.iSceneObject.transform}
        mutateTransform={(mutateTransform) => {
          props.mutateISceneObject((iSceneObject) => {
            mutateTransform(iSceneObject.transform);
          });
        }}
      />
    </div>
  );
};
