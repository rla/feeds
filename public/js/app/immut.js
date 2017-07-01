// Sets item using the callback. Returns
// new array.

exports.modifyItem = (array, index, cb) => {
    const item = array[index];
    if (item) {
        const copy = array.slice(0);
        copy[index] = cb(item);
        return copy;
    } else {
        return array;
    }
};
