import React from 'react';
import useSkin from "../../hooks/useSkin";

const GridItem = ({className}) => {

    const {skin: {grid: gridStyle}}  = useSkin();

    return (
        <div className={`${gridStyle.gridItem} ${className}`}></div>
    );
};

export default GridItem;