import {
  Component,
  Index,
  JSX,
  Show,
  createSignal,
  mergeProps,
} from "solid-js";
import { Button } from "../general-ui/Button";
import { SceneHeirarchy } from "./SceneHeirarchy";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { ClassProps } from "../../lib/utils/ClassProps";

const ListGroup: Component<{ title: string; children?: JSX.Element }> = (
  props
) => {
  const [collapsed, setCollapsed] = createSignal(false);
  return (
    <div class="flex flex-col w-full">
      <div class="flex flex-row w-full relative">
        <Button
          variant="light"
          onClick={() => {
            setCollapsed((collapsed) => !collapsed);
          }}
          class="px-[1ch]"
        >
          {collapsed() ? "+" : "-"}
        </Button>
        <div>{props.title}</div>
        <div class="absolute w-full top-0 left-0 bg-lopi-grey h-[2px]" />
      </div>
      <Show when={!collapsed()}>{props.children}</Show>
    </div>
  );
};

export const DataLists: Component<ClassProps> = (props_) => {
  const props = mergeProps({ class: "", classList: {} }, props_);

  const { getScenes } = useLopiStoreContext();
  return (
    <div
      class={["flex flex-col w-full", props.class].join(" ")}
      classList={{ ...props.classList }}
    >
      <ListGroup title="data">expanded</ListGroup>
      <Index each={getScenes()}>
        {(scene) => {
          return (
            <ListGroup title={scene().name}>
              <SceneHeirarchy scene={scene()} />
            </ListGroup>
          );
        }}
      </Index>
      <div class="w-full bg-lopi-grey h-[2px]" />
    </div>
  );
};
