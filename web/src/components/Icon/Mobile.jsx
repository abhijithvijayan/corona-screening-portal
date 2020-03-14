import React from 'react';

const MobileIcon = () => {
    return (
        <svg
            aria-hidden="true"
            data-prefix="fas"
            data-icon="mobile"
            className="mobile-solid_svg__svg-inline--fa mobile-solid_svg__fa-mobile mobile-solid_svg__fa-w-10"
            viewBox="0 0 320 512"
        >
            <path
                fill="currentColor"
                d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
            />
        </svg>
    );
};

export default React.memo(MobileIcon);
