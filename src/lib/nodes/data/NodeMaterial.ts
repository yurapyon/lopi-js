import { Material } from "@lib/3d/Material";
import { LopiNode } from "../LopiNode";

export interface NodeMaterial extends LopiNode {
  type: "material";
  material: Material;
}
