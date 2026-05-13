function prepareForDeletion(array) {
    const width = array.length;
    const height = array[0].length;
    return new Promise((resolve) => {

        const floodFill = (startX, startY, colorTypes, deletionType, specialType, specialDeletionType) => {
            const stack = [[startX, startY]];
            const visited = new Set();
            while (stack.length > 0) {
                const [x, y] = stack.pop();
                const key = `${x},${y}`;
                if (visited.has(key)) continue;
                visited.add(key);
                if (x < 0 || x >= width || y < 0 || y >= height) continue;
                const v = array[x][y];
                if (colorTypes.includes(v) || v === deletionType || v === specialDeletionType) {
                    array[x][y] = (v === specialType || v === specialDeletionType) ? specialDeletionType : deletionType;
                    stack.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
                }
            }
        };

        const checkSquares = (normalType, specialType, deletionType, specialDeletionType) => {
            for (let x = 0; x < width - 1; x++) {
                for (let y = height; y > 3; y--) {
                    if (
                        typeof array[x][y + 1] !== 'undefined' && array[x][y + 1] === 0 &&
                        typeof array[x + 1][y + 1] !== 'undefined' && array[x + 1][y + 1] === 0
                    ) continue;

                    const match = (v) => v === normalType || v === specialType || v === deletionType || v === specialDeletionType;

                    if (match(array[x][y]) && match(array[x + 1][y]) &&
                        match(array[x][y - 1]) && match(array[x + 1][y - 1])) {

                        const hasSpecial =
                            array[x][y] === specialType || array[x][y] === specialDeletionType ||
                            array[x + 1][y] === specialType || array[x + 1][y] === specialDeletionType ||
                            array[x][y - 1] === specialType || array[x][y - 1] === specialDeletionType ||
                            array[x + 1][y - 1] === specialType || array[x + 1][y - 1] === specialDeletionType;

                        const markCell = (cx, cy) => {
                            const v = array[cx][cy];
                            array[cx][cy] = (v === specialType || v === specialDeletionType) ? specialDeletionType : deletionType;
                        };
                        markCell(x, y);
                        markCell(x + 1, y);
                        markCell(x, y - 1);
                        markCell(x + 1, y - 1);

                        if (hasSpecial) {
                            floodFill(x, y, [normalType, specialType], deletionType, specialType, specialDeletionType);
                        }
                    }
                }
            }
        };

        checkSquares(1, 3, 5, 7);
        checkSquares(2, 4, 6, 8);

        resolve([...array]);
    });
}

function clearFromDeletion(array) {
    const width = array.length;
    const height = array[0].length;
    return new Promise((resolve, reject) => {

        for (let x = 0; x < width; x++) {
            for (let y = height; y > 3; y--) {
                if (array[x][y] === 5) array[x][y] = 1;
                if (array[x][y] === 6) array[x][y] = 2;
                if (array[x][y] === 7) array[x][y] = 3;
                if (array[x][y] === 8) array[x][y] = 4;
            }
        }

        resolve([...array]);
    });
}

function clearColumn(array, x) {
    const column = array[x];
    return new Promise(((resolve, reject) => {
        let i = column.length - 1;
        let j = column.length - 1;
        let count = 0;
        const newColumn = new Array(column.length).fill(0);
        for (; column[i] !== 0; i--) {
            if (i <= 1) break;
            if (column[i] === 5 || column[i] === 6 || column[i] === 7 || column[i] === 8) {
                count++;
                continue;
            }
            newColumn[j--] = column[i];
        }
        for (; i >= 0; i--) {
            newColumn[i] = column[i];
        }
        array[x] = [...newColumn];
        resolve(count);
    }));
}

export {
    prepareForDeletion,
    clearFromDeletion,
    clearColumn
}
