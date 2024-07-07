import {
  Component,
  Index,
  JSX,
  Show,
  createSelector,
  createSignal,
} from "solid-js";
import { Button } from "../general-ui/Button";
import { SceneHeirarchy } from "./SceneHeirarchy";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { ClassProps, setupClassProps } from "@utils/ClassProps";
import { useInteractionStateContext } from "../providers/InteractionProvider";

const ListGroup: Component<{
  title: string;
  selected?: boolean;
  onClick?: (e: MouseEvent) => void;
  children?: JSX.Element;
}> = (props) => {
  const [collapsed, setCollapsed] = createSignal(false);
  return (
    <div class="flex flex-col w-full">
      <div
        class="flex flex-row w-full relative"
        classList={{
          "hover:bg-lopi-grey-extra-light cursor-pointer": !!props.onClick,
          "bg-lopi-grey-extra-light": props.selected,
        }}
        onClick={props.onClick}
      >
        <Button
          variant="light"
          onClick={(e) => {
            e.stopPropagation();
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
  const { classes } = setupClassProps(props_);

  const { getScenes } = useLopiStoreContext();
  const { selectedSceneId, setSelectedSceneId } = useInteractionStateContext();

  const isSelectedScene = createSelector(selectedSceneId);

  return (
    <div class="flex flex-col w-full" classList={classes}>
      <ListGroup title="data">expanded</ListGroup>
      <Index each={getScenes()}>
        {(scene) => {
          return (
            <ListGroup
              title={scene().name}
              selected={isSelectedScene(scene().id)}
              onClick={() => {
                setSelectedSceneId(scene().id);
              }}
            >
              <SceneHeirarchy scene={scene()} />
            </ListGroup>
          );
        }}
      </Index>
      <div class="w-full bg-lopi-grey h-[2px]" />
    </div>
  );
};
