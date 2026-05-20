// rows[y][x] → array[x][y]  (string[] → char[][])
const g = (rows) =>
    Array.from({ length: rows[0].length }, (_, x) => rows.map(row => row[x]));

// array[x][y] → rows[y]  (char[][] → string[])
const s = (array) =>
    Array.from({ length: array[0].length }, (_, y) => array.map(col => col[y]).join(''));

export { g, s };
