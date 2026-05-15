function isSplit(cube) {
    return (
        cube.topLeft.y !== cube.topRight.y ||
        cube.bottomLeft.y !== cube.bottomRight.y
    );
}

export { isSplit };
