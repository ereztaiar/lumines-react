import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiTreasureMap, GiAnchor } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiTreasureMap color="#d4af37" />);
const aBlockSpecial = toDataUri(<GiTreasureMap color="#ffffff" />);
const bBlock        = toDataUri(<GiAnchor color="#1f7a7a" />);
const bBlockSpecial = toDataUri(<GiAnchor color="#ffffff" />);
const darkA         = toDataUri(<GiTreasureMap color="#a8872c" />);
const darkB         = toDataUri(<GiAnchor color="#155f5f" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
