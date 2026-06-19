import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiLeafSwirl, GiAcorn } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiLeafSwirl color="#00ff55" />);
const aBlockSpecial = toDataUri(<GiLeafSwirl color="#ffffff" />);
const bBlock        = toDataUri(<GiAcorn color="#ffaa44" />);
const bBlockSpecial = toDataUri(<GiAcorn color="#ffffff" />);
const darkA         = toDataUri(<GiLeafSwirl color="#00e048" />);
const darkB         = toDataUri(<GiAcorn color="#e8900a" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
