import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiIceCube, GiIceberg } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiIceCube color="#5fd3ff" />);
const aBlockSpecial = toDataUri(<GiIceCube color="#ffffff" />);
const bBlock        = toDataUri(<GiIceberg color="#4f6fe0" />);
const bBlockSpecial = toDataUri(<GiIceberg color="#ffffff" />);
const darkA         = toDataUri(<GiIceCube color="#2f9fd1" />);
const darkB         = toDataUri(<GiIceberg color="#3450b0" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
