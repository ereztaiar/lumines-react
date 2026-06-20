import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiPalmTree, GiCamel } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiPalmTree color="#3fae5a" />);
const aBlockSpecial = toDataUri(<GiPalmTree color="#ffffff" />);
const bBlock        = toDataUri(<GiCamel color="#e0a85c" />);
const bBlockSpecial = toDataUri(<GiCamel color="#ffffff" />);
const darkA         = toDataUri(<GiPalmTree color="#2e8a44" />);
const darkB         = toDataUri(<GiCamel color="#b8854a" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
