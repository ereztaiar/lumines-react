import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiDiamonds, GiFlame } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiDiamonds color="#56eece" />);
const aBlockSpecial = toDataUri(<GiDiamonds color="#ffffff" />);
const bBlock        = toDataUri(<GiFlame color="#e32fa9" />);
const bBlockSpecial = toDataUri(<GiFlame color="#ffffff" />);
const darkA         = toDataUri(<GiDiamonds color="#3ad4b0" />);
const darkB         = toDataUri(<GiFlame color="#d840a8" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
