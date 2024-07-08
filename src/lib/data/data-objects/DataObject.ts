import { LopiNode } from "../LopiNode";
import { Image } from "./Image";
import { LopiText } from "./Text";

interface DataObjectBase<T extends string, Data> extends LopiNode<T, Data> {}

export type DataImage = DataObjectBase<"image", Image>;
export type DataText = DataObjectBase<"text", LopiText>;

export type DataObject = DataImage | DataText;
export type DataObjectType = DataObject["type"];
