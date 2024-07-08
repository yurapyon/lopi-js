import { DataObject } from "./DataObject";

export interface DataSet {
  id: string;
  name: string;
  dataObjects: DataObject[];
}
