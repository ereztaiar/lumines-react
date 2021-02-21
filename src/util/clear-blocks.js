function prepareForDeletion(array) {
    const width = array.length;
    const height = array[0].length;
    return new Promise((resolve, reject) => {

        const setToClear = ([clearItem, readyForDeletion]) => {

            for (let x = 0; x < width - 1; x++) { // one less then active columns
                for (let y = height; y > 3; y--) {// one less then active rows
                    if (
                        typeof array[x][y + 1] !== 'undefined' && array[x][y + 1] === 0 &&
                        typeof array[x + 1][y + 1] !== 'undefined' && array[x + 1][y + 1] === 0

                    ) {
                        continue;
                    }
                    const current = (array[x][y] === clearItem || array[x][y] === readyForDeletion);
                    const left = (array[x + 1][y] === clearItem || array[x + 1][y] === readyForDeletion);
                    const above = (array[x][y - 1] === clearItem || array[x][y - 1] === readyForDeletion);
                    const diagonally = (array[x + 1][y - 1] === clearItem || array[x + 1][y - 1] === readyForDeletion);


                    if (
                        current &&
                        left &&
                        above &&
                        diagonally

                    ) {
                        array[x][y] = readyForDeletion;
                        array[x + 1][y] = readyForDeletion;
                        array[x][y - 1] = readyForDeletion;
                        array[x + 1][y - 1] = readyForDeletion;
                    }
                }

            }
        }
        setToClear([1, 5]);
        setToClear([2, 6]);

        resolve([...array]);
    });
}

function clearFromDeletion(array) {
    const width = array.length;
    const height = array[0].length;
    return new Promise((resolve, reject) => {

        for (let x = 0; x < width; x++) { // one less then active columns
            for (let y = height; y > 3; y--) {// one less then active rows
                if (array[x][y] === 5) {
                    array[x][y] = 1;
                }
                if (array[x][y] === 6) {
                    array[x][y] = 2;
                }
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
            if (column[i] === 5 || column[i] === 6) {
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