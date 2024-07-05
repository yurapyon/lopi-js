// https://stackoverflow.com/questions/41980195/recursive-partialt-in-typescript

import { isArray, isObject } from "radash";

type PartialArray<T> = {
  [_: number]: T;
};

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? PartialArray<RecursivePartial<U>>
    : T[P] extends object | undefined
    ? RecursivePartial<T[P]>
    : T[P];
};

export namespace RecursivePartial {
  function mergeArray<T>(initial: T[], override: PartialArray<T>) {
    Object.entries(override).forEach(([key, value]) => {
      initial[Number(key)] = value;
    });
  }

  export function merge<T extends { [_: string]: any }>(
    initial: T,
    override: RecursivePartial<T>
  ) {
    Object.entries(override).forEach(([key, value]) => {
      if (isArray(value)) {
        mergeArray(initial[key], value);
      } else if (isObject(value)) {
        merge(initial[key], value);
      } else {
        // NOTE:
        //   its hard to work with the types to guarantee that this is safe
        //   just ignore it and assume youre being typesafe
        // @ts-ignore
        initial[key] = value;
      }
    });
  }
}
