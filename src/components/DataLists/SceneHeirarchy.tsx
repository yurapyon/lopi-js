import { Component, Show } from "solid-js";
import { Scene } from "../../lib/3d/Scene";

export const SceneHeirarchy: Component<{ scene: Scene }> = (props) => {
  return <div>{props.scene.id}</div>;
};
