import React, { useState, useEffect } from "react";
import { FaReact } from "react-icons/fa";
import { default as splashDefault } from "@lumines/splash/src/styles/default.less";
import { default as iceAndEmber } from "@lumines/splash/src/styles/ice-and-ember.less";
import { default as splashMidnightNeon } from "@lumines/splash/src/styles/midnight-neon.less";
import { default as sunset } from "@lumines/splash/src/styles/sunset.less";
import useTimer from "@lumines/core/src/hooks/useTimer";
import useKey from "@lumines/core/src/hooks/useKey";

const COLORS_SWATCH = 5;
const SPLASH_STYLES = [iceAndEmber, splashDefault, splashMidnightNeon, sunset];

const Block = (props) => {
  const { classes } = props;

  return <div className={classes}></div>;
};

const Splash = (props) => {
  const [styleIndex, setStyleIndex] = useState(() =>
    Math.floor(Math.random() * SPLASH_STYLES.length),
  );
  const splashStyle = SPLASH_STYLES[styleIndex];

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

  useKey((key, repeat, code) => {
    if (code === "KeyS") {
      setStyleIndex((prev) => (prev + 1) % SPLASH_STYLES.length);
    }
  });

  useEffect(() => {
    setBlocks(getBlocks());
  }, [styleIndex]);

  useTimer(() => {
    setBlocks(getBlocks());
  }, 2500);

  const startTitle = (
    <div className={splashStyle.action}>
      <h4>PRESS SPACE KEY</h4>
    </div>
  );

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
      {startTitle}
    </div>
  );
};

export default Splash;
