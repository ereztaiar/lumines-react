import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiGuitar, GiMusicalNotes } from 'react-icons/gi';

/* Each block is a colored face (rect) with an icon nested on top, so the
   block reads clearly against the dark stage background. An optional ring
   wraps special blocks in a white face with a colored border, so they stand
   out from the solid-colored regular blocks of the same family. */
const toDataUri = (icon, bg, ring) => {
  const inner = renderToStaticMarkup(icon)
    .replace(/^<svg[^>]*>/, '')
    .replace(/<\/svg>$/, '');
  const face = ring
    ? `<rect width="30" height="30" rx="4" fill="#fffdf5"/>` +
      `<rect x="2" y="2" width="26" height="26" rx="3" fill="none" stroke="${ring}" stroke-width="3"/>`
    : `<rect width="30" height="30" rx="4" fill="${bg}"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">` +
    face +
    `<svg x="4" y="4" width="22" height="22" viewBox="0 0 512 512">${inner}</svg>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/* A = gold face, B = cyan face. Special blocks get a white face ringed in
   the family color, so they're clearly distinct from the solid blocks. */
const aBlock        = toDataUri(<GiGuitar color="#2a1c00" />, '#ffb627');
const aBlockSpecial = toDataUri(<GiGuitar color="#cc8400" />, null, '#ffb627');
const bBlock        = toDataUri(<GiMusicalNotes color="#002221" />, '#25d6d6');
const bBlockSpecial = toDataUri(<GiMusicalNotes color="#0e8c8c" />, null, '#25d6d6');
const darkA         = toDataUri(<GiGuitar color="#ffe2a0" />, '#a86b10');
const darkB         = toDataUri(<GiMusicalNotes color="#b4f7f7" />, '#137a7a');

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
