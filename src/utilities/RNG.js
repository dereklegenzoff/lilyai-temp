export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomArray = (length, min = 1, max = 255) => {
    const randomsInts = [];
    while (randomsInts.length < length) {
        const random = getRandomInt(min, max);

        if (randomsInts.indexOf(random) === -1) {
            randomsInts.push(random);
        }
    }
    return randomsInts;
};
