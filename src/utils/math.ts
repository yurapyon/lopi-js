import { vec2, vec3 } from "gl-matrix";

export const degreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const pointInsersectsCircle = (
  point: vec2,
  circleCenter: vec2,
  circleRadius: number
) => {
  return vec2.squaredDistance(circleCenter, point) <= circleRadius ** 2;
};

/*
 * get the vector projection of a onto b
 * returns wether the projection lies within b
 */
const getVectorProjection = (out: vec2, a: vec2, b: vec2) => {
  const dotAB = vec2.dot(a, b);
  const squaredLength = vec2.dot(b, b);
  vec2.scale(out, b, dotAB / squaredLength);
  const scalarProjectionTimesLength = vec2.dot(out, b);
  return (
    scalarProjectionTimesLength > 0 &&
    scalarProjectionTimesLength < squaredLength
  );
};

// TODO this seems to work but could be tested more throughly
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
  vec2.subtract(lineVector, pointB, pointA);
  vec2.subtract(circleVector, circleCenter, pointA);

  const vectorProjection = vec2.create();

  const projectionIsOnLine = getVectorProjection(
    vectorProjection,
    circleVector,
    lineVector
  );

  const rejectionIsInRange = pointInsersectsCircle(
    vectorProjection,
    circleVector,
    circleRadius
  );

  return projectionIsOnLine && rejectionIsInRange;
};

const scalarCross = (a: vec2, b: vec2) => {
  return a[0] * b[1] - a[1] * b[0];
};

const normal = (a: vec2, b: vec2, c: vec2) => {
  const ab = vec2.create();
  const ac = vec2.create();
  vec2.subtract(ab, a, b);
  vec2.subtract(ac, a, c);
  return scalarCross(ab, ac);
};

export const pointIntersectsTriangle = (
  point: vec2,
  triA: vec2,
  triB: vec2,
  triC: vec2
) => {
  const na = normal(triA, triB, point);
  const nb = normal(triB, triC, point);
  const nc = normal(triC, triA, point);
  // NOTE
  //   testing !(hasPositive and hasNegative) accounts for a normal being zero,
  //   where testing (allPositive or allNegative) does not
  const hasPositive = na > 0 || nb > 0 || nc > 0;
  const hasNegative = na < 0 || nb < 0 || nc < 0;
  return !(hasPositive && hasNegative);
};

export const centroidOfTriangle = (
  out: vec2,
  triA: vec2,
  triB: vec2,
  triC: vec2
) => {
  out[0] = (triA[0] + triB[0] + triC[0]) / 3;
  out[1] = (triA[1] + triB[1] + triC[1]) / 3;
};
