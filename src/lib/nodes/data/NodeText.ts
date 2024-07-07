import { LopiNode } from "@lib/nodes/LopiNode";

export type TextType = "none" | "glsl";

export interface NodeText extends LopiNode {
  type: "text";
  textType: TextType;
}
