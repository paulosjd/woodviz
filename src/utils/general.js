
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

export const getStars = rating => {
    switch (rating) {
        case 1:
            return '\u2B50';
        case 2:
            return '\u2B50\u2B50';
        case 3:
            return '\u2B50\u2B50\u2B50';
        default:
            return '';
            return '&#x2795;';
    }
};

export const compareNames = (a,b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
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
