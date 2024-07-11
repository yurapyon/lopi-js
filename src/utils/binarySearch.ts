/**
 * compareFn should return the difference between the target value and the testValue.
 *   negative if testValue is too high.
 *   positive if testValue is too low.
 * returns the index of a value that is equal to or greater than the search value.
 */
export function binarySearch<T>(
  array: T[],
  compareFn: (testValue: T) => number
) {
  let searchStart = 0;
  let searchEnd = array.length;
  let searchAt = 0;

  while (searchStart < searchEnd) {
    searchAt = Math.floor((searchStart + searchEnd) / 2);
    const direction = compareFn(array[searchAt]);
    if (direction === 0) {
      searchStart = searchAt;
      break;
    } else if (direction < 0) {
      searchEnd = searchAt - 1;
    } else {
      searchStart = searchAt + 1;
    }
  }

  return searchStart;
}

export interface Segment<T> {
  previousIndex: number | null;
  nextIndex: number | null;
}

export function getSegment<T>(
  array: T[],
  compareFn: (testValue: T) => number
): Segment<T> {
  const index = binarySearch(array, compareFn);
  const foundExactly = compareFn(array[index]) === 0;

  if (foundExactly) {
    const previousIndex = index;
    let nextIndex: number | null = previousIndex + 1;
    if (nextIndex >= array.length) {
      nextIndex = null;
    }
    return {
      previousIndex,
      nextIndex,
    };
  } else {
    if (index === 0) {
      return {
        previousIndex: null,
        nextIndex: 0,
      };
    } else {
      return {
        previousIndex: index - 1,
        nextIndex: index < array.length ? index : null,
      };
    }
  }
}

export const algoTest = () => {
  const arr = [1, 2, 3, 4, 5, 6];
  let find = 4;
  const testSearch = () => {
    console.log(
      arr,
      find,
      getSegment(arr, (testValue) => {
        return find - testValue;
      })
    );
  };
  testSearch();
  find = 4.5;
  testSearch();
  find = 0;
  testSearch();
  find = 1;
  testSearch();
  find = 6;
  testSearch();
};
