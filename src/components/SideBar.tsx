import { Component, JSX } from "solid-js";
import { Button } from "./general-ui/Button";

export const SideBar: Component<{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  collapseLeft: boolean;
  classList?: { [k: string]: boolean | undefined };
  children: JSX.Element;
}> = (props) => {
  const collapsedText = props.collapseLeft ? ">>" : "<<";
  const openText = props.collapseLeft ? "<<" : ">>";
  return (
    <div
      class="flex flex-col bg-lopi-grey-light overflow-clip"
      classList={{
        "w-[6ch]": props.collapsed,
        "w-[36ch]": !props.collapsed,
        ...props.classList,
      }}
    >
      <Button
        onClick={() => {
          props.setCollapsed(!props.collapsed);
        }}
        variant="light"
      >
        {props.collapsed ? collapsedText : openText}
      </Button>
      <div class="w-full min-h-0 grow">{props.children}</div>
    </div>
  );
};
