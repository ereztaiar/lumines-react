import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiCarnivalMask, GiPopcorn } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiCarnivalMask color="#ff3b3b" />);
const aBlockSpecial = toDataUri(<GiCarnivalMask color="#ffffff" />);
const bBlock        = toDataUri(<GiPopcorn color="#ffd23f" />);
const bBlockSpecial = toDataUri(<GiPopcorn color="#ffffff" />);
const darkA         = toDataUri(<GiCarnivalMask color="#cc2e2e" />);
const darkB         = toDataUri(<GiPopcorn color="#d1a82f" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
