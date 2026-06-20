import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiFlame, GiVolcano } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiFlame color="#ff4500" />);
const aBlockSpecial = toDataUri(<GiFlame color="#ffffff" />);
const bBlock        = toDataUri(<GiVolcano color="#2dd4bf" />);
const bBlockSpecial = toDataUri(<GiVolcano color="#ffffff" />);
const darkA         = toDataUri(<GiFlame color="#cc3700" />);
const darkB         = toDataUri(<GiVolcano color="#1fae93" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
