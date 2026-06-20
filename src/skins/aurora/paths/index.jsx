import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiPolarStar, GiCrystalBall } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiPolarStar color="#39ff9d" />);
const aBlockSpecial = toDataUri(<GiPolarStar color="#ffffff" />);
const bBlock        = toDataUri(<GiCrystalBall color="#9d4dff" />);
const bBlockSpecial = toDataUri(<GiCrystalBall color="#ffffff" />);
const darkA         = toDataUri(<GiPolarStar color="#28cc7d" />);
const darkB         = toDataUri(<GiCrystalBall color="#7a3acc" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
