import { Material } from "@lib/gfx/Material";
import { LopiNode } from "../LopiNode";

export interface DataMaterial extends LopiNode {
  type: "material";
  material: Material;
}
