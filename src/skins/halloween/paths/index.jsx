import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiPumpkin, GiGhost } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiPumpkin color="#2a0a00" />);
const aBlockSpecial = toDataUri(<GiPumpkin color="#ffffff" />);
const bBlock        = toDataUri(<GiGhost color="#2e0a3d" />);
const bBlockSpecial = toDataUri(<GiGhost color="#ffffff" />);
const darkA         = toDataUri(<GiPumpkin color="#ffd8a8" />);
const darkB         = toDataUri(<GiGhost color="#e0c4f5" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
