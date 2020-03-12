import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import MapView from './MapView';
import api from '../../api';
import * as endpoints from '../../api/constants';

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
    const [loading, setLoading] = useState(true);
    const [personsList, setPersonsList] = useState([]);

    useEffect(() => {
        async function fetchPersonsList() {
            try {
                const {
                    data: { data },
                } = await api({
                    method: 'POST',
                    url: endpoints.GET_PERSONS_ENDPOINT,
                    data: {
                        category: 'all',
                    },
                });

                const {
                    list: { contact, patient },
                } = data;
                const personFullList = [...contact, ...patient];

                console.log('fetch completed');
                setPersonsList(personFullList);
            } catch (err) {
                console.log('failed to fetch');

                if (err.response) {
                    if (err.response.status === 404) {
                        //
                    }
                }
            } finally {
                setLoading(false);
            }
        }

        fetchPersonsList();
    }, []);

    return (
        <StyledMapWrapper>
            {!loading && (
                <div className="flexbox">
                    <MapView personsList={personsList} />
                </div>
            )}
        </StyledMapWrapper>
    );
};

export default MapWrapper;
