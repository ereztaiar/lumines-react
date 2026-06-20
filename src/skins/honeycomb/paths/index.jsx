import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiBee, GiHoneyJar } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiBee color="#ffc107" />);
const aBlockSpecial = toDataUri(<GiBee color="#ffffff" />);
const bBlock        = toDataUri(<GiHoneyJar color="#7a4a14" />);
const bBlockSpecial = toDataUri(<GiHoneyJar color="#ffffff" />);
const darkA         = toDataUri(<GiBee color="#cc9a06" />);
const darkB         = toDataUri(<GiHoneyJar color="#5c3710" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
