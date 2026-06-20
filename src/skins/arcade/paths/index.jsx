import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiGamepad, GiJoystick } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiGamepad color="#39ff14" />);
const aBlockSpecial = toDataUri(<GiGamepad color="#ffffff" />);
const bBlock        = toDataUri(<GiJoystick color="#ff00ff" />);
const bBlockSpecial = toDataUri(<GiJoystick color="#ffffff" />);
const darkA         = toDataUri(<GiGamepad color="#28cc0e" />);
const darkB         = toDataUri(<GiJoystick color="#cc00cc" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
