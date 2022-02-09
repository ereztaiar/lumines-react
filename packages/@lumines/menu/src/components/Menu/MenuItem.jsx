import React from 'react';

import menuItemStyle from '@lumines/menu/src/styles/menuItem.less';

const MenuItem = props => {
    const {
        title,
        icon,
        children,
        color,
        active
    } = props;

    return (
        <div className={[menuItemStyle.root , (active ? menuItemStyle.active : '')].join(' ')} style={{ backgroundColor: color }}>
            <div className={menuItemStyle.title} style={{ backgroundColor: color }}>
                {icon}
                {title}
                <div className={menuItemStyle.content} style={{ backgroundColor: color }}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MenuItem;