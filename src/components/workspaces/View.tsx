import { Component, Show, createEffect } from "solid-js";
import { useLopiStoreContext } from "../providers/LopiStoreProvider";
import { Dynamic } from "solid-js/web";
import { EditorTypeSelector } from "../editors/EditorTypeSelector";
import { useInteractionStateContext } from "../providers/InteractionProvider";
import {
  getBottomBarForEditorType,
  getComponentForEditorType,
} from "../editors/EditorComponents";
import { Editor } from "@lib/editors/Editor";

export const View: Component<{ editorId: string }> = (props) => {
  const { getEditor, produceEditor } = useLopiStoreContext();
  const maybeEditor = getEditor(props.editorId);

  const { setSelectedEditorId } = useInteractionStateContext();

  createEffect(() => {
    // console.log(props.editorId, maybeEditor);
  });

  return (
    // TODO maybe add an error boundary
    <Show
      when={maybeEditor}
      fallback={
        // TODO
        "error"
      }
      // TODO this probably has to be keyed
    >
      {(editor) => {
        const e = editor();
        const c = getComponentForEditorType(e.type);
        const b = getBottomBarForEditorType(e.type);

        const mutateEditor = (mutateFn: (editor: Editor) => void) => {
          produceEditor(e.id, mutateFn);
        };

        return (
          <div
            class="flex flex-col h-full"
            onClick={() => {
              setSelectedEditorId(e.id);
            }}
          >
            <Dynamic component={c} editor={e} mutateEditor={mutateEditor} />
            <div class="flex flex-row bg-lopi-grey w-full">
              <EditorTypeSelector editorId={e.id} editorType={e.type} />
              <Dynamic component={b} />
            </div>
          </div>
        );
      }}
    </Show>
  );
};
