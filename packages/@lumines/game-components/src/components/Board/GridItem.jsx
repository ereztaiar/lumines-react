import React from "react";

const GridItem = (props) => {
  const { className, gridStyle } = props;

  return <div className={`${gridStyle.gridItem} ${className}`}></div>;
};

export default GridItem;
