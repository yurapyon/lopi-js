export interface LopiNode<T extends string, Data> {
  type: T;
  id: string;
  name: string;
  data: Data;
}
