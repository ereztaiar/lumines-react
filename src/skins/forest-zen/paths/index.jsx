import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiLeafSwirl, GiAcorn } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiLeafSwirl color="#1c2b14" />);
const aBlockSpecial = toDataUri(<GiLeafSwirl color="#ffffff" />);
const bBlock        = toDataUri(<GiAcorn color="#3a2010" />);
const bBlockSpecial = toDataUri(<GiAcorn color="#ffffff" />);
const darkA         = toDataUri(<GiLeafSwirl color="#cde6b8" />);
const darkB         = toDataUri(<GiAcorn color="#e8c8a8" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
