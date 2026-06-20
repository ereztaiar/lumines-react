import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiCoral, GiTropicalFish } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiCoral color="#ff6f61" />);
const aBlockSpecial = toDataUri(<GiCoral color="#ffffff" />);
const bBlock        = toDataUri(<GiTropicalFish color="#1fc2c2" />);
const bBlockSpecial = toDataUri(<GiTropicalFish color="#ffffff" />);
const darkA         = toDataUri(<GiCoral color="#cc5a4d" />);
const darkB         = toDataUri(<GiTropicalFish color="#189a9a" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
