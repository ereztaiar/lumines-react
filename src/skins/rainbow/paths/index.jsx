import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiRainbowStar, GiDiamonds } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiRainbowStar color="#ff3366" />);
const aBlockSpecial = toDataUri(<GiRainbowStar color="#ffffff" />);
const bBlock        = toDataUri(<GiDiamonds color="#3366ff" />);
const bBlockSpecial = toDataUri(<GiDiamonds color="#ffffff" />);
const darkA         = toDataUri(<GiRainbowStar color="#cc2952" />);
const darkB         = toDataUri(<GiDiamonds color="#2952cc" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
