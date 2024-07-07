import { NodeImage } from "./NodeImage";
import { NodeMaterial } from "./NodeMaterial";
import { NodeText } from "./NodeText";

export type DataObject = NodeImage | NodeMaterial | NodeText;

export type DataObjectType = DataObject["type"];
