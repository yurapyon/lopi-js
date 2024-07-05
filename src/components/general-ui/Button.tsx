import { ParentComponent } from "solid-js";
import { ClassProps, setupClassProps } from "@utils/ClassProps";

interface VariantInfo {
  selected: string;
  toggled: string;
  deselected: string;
}

const variants: { [k: string]: VariantInfo } = {
  default: {
    selected: "bg-lopi-grey-light",
    toggled: "bg-lopi-grey-light hover:bg-lopi-grey",
    deselected: "bg-lopi-grey hover:bg-lopi-grey-light",
  },
  light: {
    selected: "bg-lopi-grey-extra-light",
    toggled: "bg-lopi-grey-extra-light hover:bg-lopi-grey-light",
    deselected:
      "bg-lopi-grey-light hover:bg-lopi-grey-extra-light text-[#606060] hover:text-white",
  },
};

export type ButtonVariant = "light" | "default";

export interface ButtonProps extends ClassProps {
  selected?: boolean;
  variant?: ButtonVariant;
  onClick: (e: MouseEvent) => void;
}

export const Button: ParentComponent<ButtonProps> = (props_) => {
  const { props, classes } = setupClassProps(
    {
      selected: false,
      variant: "default",
    },
    props_
  );

  const variant = () => variants[props.variant];

  return (
    <button
      class="select-none"
      classList={{
        ...classes,
        [variant().selected]: props.selected,
        [variant().deselected]: !props.selected,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
