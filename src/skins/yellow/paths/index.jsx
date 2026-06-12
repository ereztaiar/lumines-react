import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiBee, GiHoneycomb } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiBee color="#ffca28" />);
const aBlockSpecial = toDataUri(<GiBee color="#ff6f00" />);
const bBlock        = toDataUri(<GiHoneycomb color="#ffd54f" />);
const bBlockSpecial = toDataUri(<GiHoneycomb color="#fff59d" />);
const darkA         = toDataUri(<GiBee color="#caa14a" />);
const darkB         = toDataUri(<GiHoneycomb color="#e0b65c" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
