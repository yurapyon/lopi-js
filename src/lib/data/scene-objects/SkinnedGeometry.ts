import { Geometry } from "./Geometry";

export interface VertexWeight {
  index: string;
  amount: number;
}

export interface SkinnedGeometry {
  geometry: Geometry;
  weights: VertexWeight[];
  armatureId: string;
}
