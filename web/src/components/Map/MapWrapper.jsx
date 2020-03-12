import React from 'react';
import styled from 'styled-components';

import MapView from './MapView';

const StyledMapWrapper = styled.div`
    height: 100vh;
    max-height: 100%;

    .flexbox {
        height: 665px;
        width: 100%;
        height: 100%;
        position: relative;
    }
`;

const MapWrapper = () => {
    return (
        <StyledMapWrapper>
            <div className="flexbox">
                <MapView />
            </div>
        </StyledMapWrapper>
    );
};

export default MapWrapper;
