import { Component } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { TransfromData } from "../3dData/TransformData";
import { ISceneObject } from "@lib/scene/SceneObject";

export const ISceneObjectData: Component<
  { iSceneObject: ISceneObject } & ClassProps
> = (props_) => {
  const { props, classes } = setupClassProps(props_);

  return (
    <div class="flex flex-col" classList={classes}>
      <div class="flex flex-row gap-[1ch]">
        <div>{props.iSceneObject.isActive ? "O" : "X"}</div>
        <div>{props.iSceneObject.name}</div>
      </div>
      <TransfromData
        transform={props.iSceneObject.transform}
        onChange={() => {}}
      />
    </div>
  );
};
