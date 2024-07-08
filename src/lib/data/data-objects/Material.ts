import { Program } from "@lib/gfx/Program";

export interface Material {
  vertShaderTextId: string;
  fragShaderTextId: string;
  runtime: {
    program: Program;
  };
}
