import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { GiMapleLeaf, GiOakLeaf } from 'react-icons/gi';

const toDataUri = (el) =>
    `data:image/svg+xml,${encodeURIComponent(renderToStaticMarkup(el))}`;

const aBlock        = toDataUri(<GiMapleLeaf color="#e2572d" />);
const aBlockSpecial = toDataUri(<GiMapleLeaf color="#ffffff" />);
const bBlock        = toDataUri(<GiOakLeaf color="#d9a521" />);
const bBlockSpecial = toDataUri(<GiOakLeaf color="#ffffff" />);
const darkA         = toDataUri(<GiMapleLeaf color="#b8431f" />);
const darkB         = toDataUri(<GiOakLeaf color="#ad8419" />);

export { aBlock, aBlockSpecial, bBlock, bBlockSpecial, darkA, darkB }
