import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MdMusicNote, MdLibraryMusic } from 'react-icons/md';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<MdMusicNote color="#F4C430" />);
const aBlockSpecial = toDataUri(<MdLibraryMusic color="#FFD700" />);
const bBlock        = toDataUri(<MdMusicNote color="#38bdf8" />);
const bBlockSpecial = toDataUri(<MdLibraryMusic color="#00D4E8" />);
const darkA         = toDataUri(<MdMusicNote color="#7a6330" />);
const darkB         = toDataUri(<MdMusicNote color="#1e5a7a" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB };
