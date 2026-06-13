import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiCrystalShine, GiTropicalFish } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiCrystalShine color="#012a2e" />);
const aBlockSpecial = toDataUri(<GiCrystalShine color="#ffffff" />);
const bBlock        = toDataUri(<GiTropicalFish color="#3d0a1f" />);
const bBlockSpecial = toDataUri(<GiTropicalFish color="#ffffff" />);
const darkA         = toDataUri(<GiCrystalShine color="#9be8e0" />);
const darkB         = toDataUri(<GiTropicalFish color="#ffc4d6" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
