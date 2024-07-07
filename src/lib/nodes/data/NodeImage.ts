import { LopiNode } from "@lib/nodes/LopiNode";

export interface NodeImage extends LopiNode {
  type: "image";
  filepath: string;
}
