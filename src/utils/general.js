
export const holdAsStr = (x, y) => {
    x = x.toString().length === 1 ? '0' + x : x.toString();
    y = y.toString().length === 1 ? '0' + y : y.toString();
    return x.concat(y)
};

export const dimHoldAsStr = (n) => {
    n = n.toString().length === 1 ? '0' + n : n.toString();
    return n
};

export const orderGrades = (a, b) => {
    if (a[0] > b[0]) {
        return 1;
    } else if (a[0] < b[0]) {
        return -1;
    } else if (a[1] > b[1]) {
        return 1;
    } else if (a[1] < b[1]) {
        return -1;
    } else if (a[2]) {
        return 1;
    } else {
        return 0
    }
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
