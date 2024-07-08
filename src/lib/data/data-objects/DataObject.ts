import { LopiNode } from "../LopiNode";
import { Image } from "./Image";
import { LopiText } from "./LopiText";
import { Material } from "./Material";

interface DataObjectBase<T extends string, Data> extends LopiNode<T, Data> {}

export type DataImage = DataObjectBase<"image", Image>;
export type DataText = DataObjectBase<"text", LopiText>;
export type DataMaterial = DataObjectBase<"material", Material>;

export type DataObject = DataImage | DataText | DataMaterial;
export type DataObjectType = DataObject["type"];
