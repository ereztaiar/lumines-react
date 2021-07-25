import React from 'react';

const MenuItem = props => {
    const {
        title,
        icon,
        children
    } = props;
    return (
        <div>
            <h2>{icon}{title}</h2>
            <>{children}</>
        </div>
    );
};

export default MenuItem;