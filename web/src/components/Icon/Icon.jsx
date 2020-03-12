import React from 'react';

import MapMarker from './MapMarker';
import Close from './Close';

const icons = {
    map_marker: MapMarker,
    close: Close,
};

const Icon = ({ name, ...rest }) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <div {...rest}>{React.createElement(icons[name])}</div>;
};

export default Icon;
