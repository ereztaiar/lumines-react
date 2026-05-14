import React, { useState } from "react";
import { FaReact } from "react-icons/fa";
import { default as splashStyle } from "@lumines/splash/src/styles/splash_2.less";
import useTimer from "@lumines/core/src/hooks/useTimer";

const COLORS_SWATCH = 5;

const Block = (props) => {
  const { classes } = props;

  return <div className={classes}></div>;
};

const Splash = (props) => {
  const getBlocks = () => {
    const blocks = (
      <>
        {[...Array(8 * 8)].map((item, idx) => {
          const blockIdx = Math.floor(Math.random() * COLORS_SWATCH + 1);
          const blockClass = splashStyle[`block-${blockIdx}`];
          return (
            <Block key={idx} classes={`${splashStyle.block} ${blockClass}`} />
          );
        })}
      </>
    );
    return blocks;
  };

  const [blocks, setBlocks] = useState(getBlocks);

  useTimer(() => {
    setBlocks(getBlocks());
  }, 2500);

  return (
    <div className={splashStyle.root}>
      {blocks}
      <div className={splashStyle.titleCard}>
        <h3>
          PUZZLE <FaReact /> FUSION
        </h3>
        <h1 className={splashStyle.mainTitle}>
          LUMINES REACT
          <br />
          AI REMASTER
        </h1>
        <h3>
          PUZZLE
          <img src={"/favicon.svg"} />
          FUSION
        </h3>
      </div>
      <div className={splashStyle.action}>
        <h4>PRESS SPACE KEY</h4>
      </div>
    </div>
  );
};

export default Splash;
