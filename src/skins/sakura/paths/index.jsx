import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiFlowerEmblem, GiBigWave } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiFlowerEmblem color="#fff0f6" />);
const aBlockSpecial = toDataUri(<GiFlowerEmblem color="#8e2350" />);
const bBlock        = toDataUri(<GiBigWave color="#f2ece1" />);
const bBlockSpecial = toDataUri(<GiBigWave color="#ffd86b" />);
const darkA         = toDataUri(<GiFlowerEmblem color="#d4a8ba" />);
const darkB         = toDataUri(<GiBigWave color="#7fa3bf" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
