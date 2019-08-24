/**
 * Helper function to update single item in array.
 */
const updateItem = <T>(array: T[], index: number, fn: (item: T) => T): T[] => {
  const item = array[index];
  const copy = array.slice(0);
  copy[index] = fn(item);
  return copy;
};

export default updateItem;
