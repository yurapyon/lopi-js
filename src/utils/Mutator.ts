export type Mutator<T> = (mutateFn: (mutate: T) => void) => void;
