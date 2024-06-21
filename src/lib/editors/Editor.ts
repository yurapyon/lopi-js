import { Editor3d } from "./Editor3d";
import { EditorAnimation } from "./EditorAnimation";
import { EditorUV } from "./EditorUV";

export type Editor = Editor3d | EditorUV | EditorAnimation;
export type EditorType = Editor["type"];
