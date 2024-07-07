import { createUniqueId } from "@utils/createUniqueId";

export interface LopiNode {
  id: string;
  name: string;
}

export namespace LopiNode {
  export const create = (): LopiNode => {
    return {
      id: createUniqueId("node"),
      name: "object",
    };
  };
}
