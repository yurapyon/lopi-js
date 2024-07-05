let count = 0;

export const createUniqueId = (baseString?: string) => {
  let ret = count.toString();
  count += 1;
  if (baseString) {
    ret = [baseString, "_", ret].join("");
  }
  return ret;
};
