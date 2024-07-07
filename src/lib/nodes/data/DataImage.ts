import { Image } from "@lib/data/Image";
import { LopiNode } from "@lib/nodes/LopiNode";

export interface DataImage extends LopiNode {
  type: "image";
  image: Image;
  texture: WebGLTexture;
}
