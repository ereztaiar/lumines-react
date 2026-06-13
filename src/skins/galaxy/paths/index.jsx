import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiRingedPlanet, GiStarShuriken } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiRingedPlanet color="#1c0a3d" />);
const aBlockSpecial = toDataUri(<GiRingedPlanet color="#ffffff" />);
const bBlock        = toDataUri(<GiStarShuriken color="#3d2a05" />);
const bBlockSpecial = toDataUri(<GiStarShuriken color="#ffffff" />);
const darkA         = toDataUri(<GiRingedPlanet color="#dcd0fb" />);
const darkB         = toDataUri(<GiStarShuriken color="#ffe9b0" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
