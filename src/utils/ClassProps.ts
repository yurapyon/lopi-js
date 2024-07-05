import { mergeProps } from "solid-js";

type ClassList = { [k: string]: boolean | undefined };

export interface ClassProps {
  class?: string;
  classList?: ClassList;
}

export function setupClassProps<T extends unknown[]>(...sources: T) {
  const props_ = mergeProps({ class: "", classList: {} }, ...sources);
  return {
    props: props_,
    classes: { [props_.class]: true, ...props_.classList },
  };
}
