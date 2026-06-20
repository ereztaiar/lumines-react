import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiFireworkRocket, GiRocket } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiFireworkRocket color="#ff2e4d" />);
const aBlockSpecial = toDataUri(<GiFireworkRocket color="#ffffff" />);
const bBlock        = toDataUri(<GiRocket color="#2ee6ff" />);
const bBlockSpecial = toDataUri(<GiRocket color="#ffffff" />);
const darkA         = toDataUri(<GiFireworkRocket color="#cc1f3b" />);
const darkB         = toDataUri(<GiRocket color="#1cb8cc" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
