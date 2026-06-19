import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiPumpkin, GiGhost } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiPumpkin color="#f9553c" />);
const aBlockSpecial = toDataUri(<GiPumpkin color="#ffffff" />);
const bBlock        = toDataUri(<GiGhost color="#c79be3" />);
const bBlockSpecial = toDataUri(<GiGhost color="#ffffff" />);
const darkA         = toDataUri(<GiPumpkin color="#e84020" />);
const darkB         = toDataUri(<GiGhost color="#a060e0" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
