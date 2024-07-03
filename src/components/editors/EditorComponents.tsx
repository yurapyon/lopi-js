import { Component } from "solid-js";
import { Editor, EditorType } from "../../lib/editors/Editor";
import { Editor3dComponent } from "./Editor3dComponent";

const DummyEditorComponent: Component<{ editor: Editor }> = () => {
  return null;
};

export const getComponentForEditorType = (type: EditorType) => {
  switch (type) {
    case "3d":
      return Editor3dComponent as Component<{ editor: Editor }>;
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
