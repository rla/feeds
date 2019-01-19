// Sets item using the callback. Returns
// new array.

export const modifyItem = <T>(array: T[], index: number, cb: (item: T) => T) => {
    const item = array[index];
    if (item) {
        const copy = array.slice(0);
        copy[index] = cb(item);
        return copy;
    } else {
        return array;
    }
};
