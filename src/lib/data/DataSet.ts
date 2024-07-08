import { DataObject } from "./data-objects/DataObject";

export interface DataSet {
  id: string;
  name: string;
  dataObjects: DataObject[];
}
