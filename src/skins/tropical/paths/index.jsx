import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiPineapple, GiPalmTree } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiPineapple color="#fff6e8" />);
const aBlockSpecial = toDataUri(<GiPineapple color="#ffe066" />);
const bBlock        = toDataUri(<GiPalmTree color="#f0fffd" />);
const bBlockSpecial = toDataUri(<GiPalmTree color="#ffe066" />);
const darkA         = toDataUri(<GiPineapple color="#d99c8f" />);
const darkB         = toDataUri(<GiPalmTree color="#66b8bd" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
