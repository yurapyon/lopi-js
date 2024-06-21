import { ParentComponent, mergeProps, splitProps } from "solid-js";

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

export const Button: ParentComponent<{
  class?: string;
  classList?: { [k: string]: boolean | undefined };
  selected?: boolean;
  variant?: ButtonVariant;
  onClick: (e: MouseEvent) => void;
}> = (props_) => {
  const props = mergeProps({ selected: false, variant: "default" }, props_);

  const variant = () => variants[props.variant];

  return (
    <button
      class={["select-none", props.class].join(" ")}
      classList={{
        [variant().selected]: props.selected,
        [variant().deselected]: !props.selected,
        ...props.classList,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
