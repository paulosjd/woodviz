
export const holdAsStr = (x, y) => {
    x = x.toString().length === 1 ? '0' + x : x.toString();
    y = y.toString().length === 1 ? '0' + y : y.toString();
    return x.concat(y)
};

export const dimHoldAsStr = (n) => {
    n = n.toString().length === 1 ? '0' + n : n.toString();
    return n
};

export const toTitleCase = (phrase) => {
    if (phrase.toUpperCase() === phrase) {
        return phrase
    }
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
