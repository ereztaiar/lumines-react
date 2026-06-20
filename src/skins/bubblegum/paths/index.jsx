import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiSpiralLollipop, GiDonut } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiSpiralLollipop color="#ff2d95" />);
const aBlockSpecial = toDataUri(<GiSpiralLollipop color="#ffffff" />);
const bBlock        = toDataUri(<GiDonut color="#3ec9ff" />);
const bBlockSpecial = toDataUri(<GiDonut color="#ffffff" />);
const darkA         = toDataUri(<GiSpiralLollipop color="#d11f78" />);
const darkB         = toDataUri(<GiDonut color="#1f9bd1" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
