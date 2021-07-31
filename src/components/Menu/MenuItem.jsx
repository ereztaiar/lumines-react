import React from 'react';

import menuItemStyle from 'Components/Menu/styles/menuItem.less';

const MenuItem = props => {
    const {
        title,
        icon,
        children,
        color
    } = props;

    return (
        <div className={menuItemStyle.root} style={{backgroundColor: color}}>
            <div className={menuItemStyle.title} style={{backgroundColor: color}}>
                {icon}
                {title}
                <div className={menuItemStyle.content} style={{backgroundColor: color}}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MenuItem;