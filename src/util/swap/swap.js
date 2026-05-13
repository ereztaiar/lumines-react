function swap(array, src, dest) {
    return new Promise((resolve, reject) => {
        const tmp = array[src.x][src.y];
        array[src.x][src.y] = array[dest.x][dest.y];
        array[dest.x][dest.y] = tmp;
        resolve([array, dest]);
    });
}

export { swap };
