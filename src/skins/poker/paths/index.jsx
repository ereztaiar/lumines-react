import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiHearts, GiSpades, GiDiamonds, GiClubs } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiHearts color="#d11a2d" />);
const aBlockSpecial = toDataUri(<GiDiamonds color="#ff2742" />);
const bBlock        = toDataUri(<GiSpades color="#15151a" />);
const bBlockSpecial = toDataUri(<GiClubs color="#15151a" />);
const darkA         = toDataUri(<GiHearts color="#9c2733" />);
const darkB         = toDataUri(<GiSpades color="#3a3a42" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
