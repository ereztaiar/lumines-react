import React from "react";
import useSkin from "@lumines/core/src/hooks/useSkin";

const GridItem = ({ className }) => {
  const {
    skin: { grid: gridStyle },
  } = useSkin();

  return <div className={`${gridStyle.gridItem} ${className}`}></div>;
};

export default GridItem;
