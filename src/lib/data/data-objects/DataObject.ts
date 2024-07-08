import { LopiNode } from "../LopiNode";
import { Image } from "./Image";
import { LopiText } from "./Text";

interface DataObjectBase<T extends string, Data, RuntimeData>
  extends LopiNode<T, Data, RuntimeData> {}

export type DataImage = DataObjectBase<"image", Image, undefined>;
export type DataText = DataObjectBase<"text", LopiText, undefined>;

export type DataObject = DataImage | DataText;
export type DataObjectType = DataObject["type"];
