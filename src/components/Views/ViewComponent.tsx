import { Component, Index, Show, createSignal } from "solid-js";
import { Button } from "../general-ui/Button";
import { View } from "../../lib/views/View";

export const ViewComponent: Component<{ view: View }> = (props) => {
  const [dropdownOpen, setDropdownOpen] = createSignal(false);
  const editorTypes = ["3d", "uv", "animation"];
  return (
    <div class="flex flex-col h-full">
      <div class="grow min-h-0">{props.view.id}</div>
      <div class="w-full flex flex-row bg-lopi-grey">
        <div class="relative">
          <Button
            class="px-[1ch]"
            onClick={() => setDropdownOpen((dropdownOpen) => !dropdownOpen)}
          >
            type
          </Button>
          <Show when={dropdownOpen()}>
            <div class="absolute bottom-full left-0 min-w-full flex flex-col bg-lopi-grey">
              <Index each={editorTypes}>
                {(editorType) => {
                  return (
                    <Button
                      onClick={() => {
                        console.log(editorType());
                        setDropdownOpen(false);
                      }}
                    >
                      {editorType()}
                    </Button>
                  );
                }}
              </Index>
            </div>
          </Show>
        </div>
        <div class="grow min-w-0" />
      </div>
    </div>
  );
};
