import { Component } from "solid-js";
import { Editor3dComponent } from "./Editor3dComponent";
import { Editor, EditorType } from "@lib/editors/Editor";
import { Mutator } from "@utils/Mutator";

type EditorComponent = Component<{
  editor: Editor;
  mutateEditor: Mutator<Editor>;
}>;

const DummyEditorComponent: EditorComponent = () => {
  return null;
};

export const getComponentForEditorType = (type: EditorType) => {
  switch (type) {
    case "3d":
      return Editor3dComponent as EditorComponent;
    case "uv":
      return DummyEditorComponent;
    case "animation":
      return DummyEditorComponent;
  }
};

const DummyBottomBar: Component = () => {
  return null;
};

export const getBottomBarForEditorType = (type: EditorType) => {
  switch (type) {
    case "3d":
      return DummyBottomBar;
    case "uv":
      return DummyBottomBar;
    case "animation":
      return DummyBottomBar;
  }
};
