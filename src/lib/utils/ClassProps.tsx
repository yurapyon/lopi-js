import { mergeProps } from "solid-js";

export interface ClassProps {
  class?: string;
  classList?: { [k: string]: boolean | undefined };
}

type ClassList = NonNullable<ClassProps["classList"]>;

const defaultClassProps = { class: "", classList: {} };

export function setupClassProps<T extends unknown[]>(...sources: T) {
  const props_ = mergeProps(defaultClassProps, ...sources);
  return {
    props: props_,
    classes: { [props_.class]: true, ...props_.classList },
  };
}
