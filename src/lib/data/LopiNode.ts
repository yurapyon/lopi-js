export interface LopiNode<T extends string, Data, RuntimeData> {
  type: T;
  id: string;
  name: string;
  data: Data;
  runtime: RuntimeData;
}
