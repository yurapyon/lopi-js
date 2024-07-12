import { vec2 } from "gl-matrix";

export const degreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const pointInsersectsCircle = (
  point: vec2,
  circleCenter: vec2,
  circleRadius: number
) => {
  return vec2.squaredDistance(circleCenter, point) < circleRadius ** 2;
};

const getProjections = (out: vec2, a: vec2, b: vec2) => {
  vec2.normalize(out, b);
  const scalarProjection = vec2.dot(a, b);
  vec2.scale(out, out, scalarProjection);
  return scalarProjection;
};

export const lineSegmentIntersectsCircle = (
  pointA: vec2,
  pointB: vec2,
  circleCenter: vec2,
  circleRadius: number
) => {
  if (
    pointInsersectsCircle(pointA, circleCenter, circleRadius) ||
    pointInsersectsCircle(pointB, circleCenter, circleRadius)
  ) {
    return true;
  }

  const lineVector = vec2.create();
  const circleVector = vec2.create();
  vec2.subtract(lineVector, pointA, pointB);
  vec2.subtract(circleVector, pointA, circleCenter);

  const vectorProjection = vec2.create();
  const scalarProjection = getProjections(
    vectorProjection,
    circleVector,
    lineVector
  );

  const projectionIsOnLine =
    scalarProjection > 0 &&
    scalarProjection ** 2 < vec2.squaredLength(lineVector);

  const rejectionIsInRange = pointInsersectsCircle(
    vectorProjection,
    circleVector,
    circleRadius
  );

  return projectionIsOnLine && rejectionIsInRange;
};

export const pointIntersectsTriangle = (
  point: vec2,
  triA: vec2,
  triB: vec2,
  triC: vec2
) => {
  // TODO
  return false;
};

export const centroidOfTriangle = (triA: vec2, triB: vec2, triC: vec2) => {
  // TODO
  return vec2.create();
};
