import { Component, Index, createSelector } from "solid-js";
import { Button } from "../general-ui/Button";
import { useInteractionStateContext } from "../providers/InteractionProvider";

export const ToolList: Component<{}> = (props) => {
  const { selectedToolId, setSelectedToolId } = useInteractionStateContext();

  const tools = ["tool_1", "tool_2", "tool_3", "tool_4"];
  const isSelected = createSelector(selectedToolId);

  return (
    <div class="flex flex-row flex-wrap w-full">
      <Index each={tools}>
        {(item) => {
          return (
            <Button
              class="h-[3em]"
              selected={isSelected(item())}
              onClick={() => setSelectedToolId(item())}
              variant="light"
            >
              {item()}
            </Button>
          );
        }}
      </Index>
    </div>
  );
};
