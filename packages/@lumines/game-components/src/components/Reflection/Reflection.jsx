import React from 'react';

const Reflection = props => {

    const {
        children,
        styles: {
            reflectionStyle
        }
    } = props;

    return (
        <div
            className={reflectionStyle.reflection}>
            {children}
        </div>
    );
}

export default Reflection;