import { DataImage } from "./DataImage";
import { DataMaterial } from "./DataMaterial";
import { DataText } from "./DataText";

export type DataObject = DataImage | DataMaterial | DataText;

export type DataObjectType = DataObject["type"];
