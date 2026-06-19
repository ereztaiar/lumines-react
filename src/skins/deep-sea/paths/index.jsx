import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiCrystalShine, GiTropicalFish } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiCrystalShine color="#ffb627" />);
const aBlockSpecial = toDataUri(<GiCrystalShine color="#ffffff" />);
const bBlock        = toDataUri(<GiTropicalFish color="#fe6ae4" />);
const bBlockSpecial = toDataUri(<GiTropicalFish color="#ffffff" />);
const darkA         = toDataUri(<GiCrystalShine color="#e8a020" />);
const darkB         = toDataUri(<GiTropicalFish color="#e038b8" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
