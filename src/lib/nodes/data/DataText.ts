import { LopiNode } from "@lib/nodes/LopiNode";

export type TextType = "none" | "glsl";

export interface DataText extends LopiNode {
  type: "text";
  textType: TextType;
}
