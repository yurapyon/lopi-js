import { Component } from "solid-js";
import { View } from "../../lib/LopiStore";

export const ViewComponent: Component<{ view: View }> = (props) => {
  return <div>{props.view.id}</div>;
};
