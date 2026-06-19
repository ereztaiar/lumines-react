import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiRingedPlanet, GiStarShuriken } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiRingedPlanet color="#00e5ff" />);
const aBlockSpecial = toDataUri(<GiRingedPlanet color="#ffffff" />);
const bBlock        = toDataUri(<GiStarShuriken color="#ffd700" />);
const bBlockSpecial = toDataUri(<GiStarShuriken color="#ffffff" />);
const darkA         = toDataUri(<GiRingedPlanet color="#00c8e0" />);
const darkB         = toDataUri(<GiStarShuriken color="#e8c000" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
