import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaHourglassHalf, FaClock } from 'react-icons/fa';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<FaHourglassHalf color="#F4C430" />);
const aBlockSpecial = toDataUri(<FaHourglassHalf color="#ffffff" />);
const bBlock        = toDataUri(<FaClock color="#00D4E8" />);
const bBlockSpecial = toDataUri(<FaClock color="#ffffff" />);
const darkA         = toDataUri(<FaHourglassHalf color="#A07820" />);
const darkB         = toDataUri(<FaClock color="#009AAA" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
