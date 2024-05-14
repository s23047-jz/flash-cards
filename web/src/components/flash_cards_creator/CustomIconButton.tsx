import React from 'react';

// @ts-ignore
const CustomIconButton = ({ onClick, src, alt, width, height }) => {
    return (
        <div style={{ position: 'relative', width: width, height: height }}>
            <button onClick={onClick}>
            <img
                src={src}
                alt={alt}
                style={{ width: '100%', height: '100%', position: 'absolute', top: '2px', left: '-12px', zIndex: 999,  }}
            />


            </button>
        </div>
    );
};

export default CustomIconButton;