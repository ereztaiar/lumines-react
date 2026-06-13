import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiGuitar, GiMusicalNotes } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

/* A = gold face, B = cyan face. Icons are dark on the bright active faces and
   light on the darker placed faces, so they stay readable. */
const aBlock        = toDataUri(<GiGuitar color="#2a1c00" />);
const aBlockSpecial = toDataUri(<GiGuitar color="#fffbe6" />);
const bBlock        = toDataUri(<GiMusicalNotes color="#002221" />);
const bBlockSpecial = toDataUri(<GiMusicalNotes color="#eafffe" />);
const darkA         = toDataUri(<GiGuitar color="#ffe2a0" />);
const darkB         = toDataUri(<GiMusicalNotes color="#b4f7f7" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
