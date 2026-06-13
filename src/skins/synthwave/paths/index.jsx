import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiDiamonds, GiFlame } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiDiamonds color="#0a1a2e" />);
const aBlockSpecial = toDataUri(<GiDiamonds color="#ffffff" />);
const bBlock        = toDataUri(<GiFlame color="#2e0a23" />);
const bBlockSpecial = toDataUri(<GiFlame color="#ffffff" />);
const darkA         = toDataUri(<GiDiamonds color="#7fe8ef" />);
const darkB         = toDataUri(<GiFlame color="#ffb3ec" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
