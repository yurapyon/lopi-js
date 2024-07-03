import { Button } from "../general-ui/Button";
import { EDITOR_TYPES, EditorType } from "../../lib/editors/Editor";
import { Component, Index, Show, createSelector, createSignal } from "solid-js";

const switchEditorType = (editorId: string, newEditorType: EditorType) => {
  // TODO
};

export const EditorTypeSelector: Component<{
  editorId: string;
  editorType: EditorType;
}> = (props) => {
  // TODO
  // remove and add new editor by editorId
  const [dropdownOpen, setDropdownOpen] = createSignal(false);
  const currentType = createSelector(() => props.editorType);
  return (
    <div class="relative">
      <Button
        class="px-[1ch]"
        onClick={() => setDropdownOpen((dropdownOpen) => !dropdownOpen)}
      >
        type
      </Button>
      <Show when={dropdownOpen()}>
        <div class="absolute bottom-full left-0 min-w-full flex flex-col bg-lopi-grey">
          <Index each={EDITOR_TYPES}>
            {(editorType) => {
              return (
                <Button
                  selected={currentType(editorType())}
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
  );
};
