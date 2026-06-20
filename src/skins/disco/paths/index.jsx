import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FaRecordVinyl } from 'react-icons/fa';
import { GiCrystalShine } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<FaRecordVinyl color="#ffd700" />);
const aBlockSpecial = toDataUri(<FaRecordVinyl color="#ffffff" />);
const bBlock        = toDataUri(<GiCrystalShine color="#ff2bd6" />);
const bBlockSpecial = toDataUri(<GiCrystalShine color="#ffffff" />);
const darkA         = toDataUri(<FaRecordVinyl color="#c9a600" />);
const darkB         = toDataUri(<GiCrystalShine color="#b3179e" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
