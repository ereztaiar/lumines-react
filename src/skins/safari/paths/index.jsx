import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiElephant, GiLion } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiElephant color="#3fae46" />);
const aBlockSpecial = toDataUri(<GiElephant color="#ffffff" />);
const bBlock        = toDataUri(<GiLion color="#e8a23c" />);
const bBlockSpecial = toDataUri(<GiLion color="#ffffff" />);
const darkA         = toDataUri(<GiElephant color="#2e8a36" />);
const darkB         = toDataUri(<GiLion color="#c2841f" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
