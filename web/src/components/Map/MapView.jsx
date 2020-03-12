import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

import MapMarker from './MapMarkerWithWindow';

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

const personMarkers = [
    {
        id: 'Pta/cov/1',
        level: 1,
        latlng: [9.2230771, 76.7380211],
        name: 'Joey',
        age: 21,
        gender: 'M',
        address: '221B Baker Street',
        contact: 9999999999,
    },
    {
        id: 'Pta/cov/2',
        level: 2,
        latlng: [9.2215311, 76.7499079],
        name: 'Chandler',
        age: 22,
        gender: 'M',
        address: '222B Baker Street',
        contact: 9999999999,
    },
    {
        id: 'Pta/cov/3',
        level: 3,
        latlng: [9.2095432, 76.75673],
        name: 'Ross',
        age: 23,
        gender: 'M',
        address: '223B Baker Street',
        contact: 9999999999,
    },
];

const RenderGoogleMapsMarkers = markers => {
    const [activeMarkerId, setActiveMarkerId] = useState('');

    return markers.map(({ id, latlng, name, age, gender, address, contact, level }) => {
        // level 1 -> confirmed, 2 -> primary, 3 -> secondary
        const colors = ['#8b0000', '#00008B', 'yellow'];

        console.log(activeMarkerId);

        const onMarkerClick = targetId => {
            return setActiveMarkerId(targetId);
        };

        return (
            <MapMarker
                key={id}
                onMarkerClick={onMarkerClick}
                activeMarkerId={activeMarkerId}
                lat={latlng[0]}
                lng={latlng[1]}
                personId={id}
                name={name}
                age={age}
                gender={gender}
                address={address}
                contact={contact}
                color={colors[level - 1]}
            />
        );
    });
};

// coordinates of Pathanamthitta
const mapConfig = {
    center: [9.2648, 76.787],
    zoom: 12,
};

const getMapOptions = maps => {
    return {
        mapTypeControl: true,
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
};

const MapView = () => {
    useEffect(() => {
        // ToDo: fetch all persons from api
    }, []);

    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: mapsApiKey,
                language: 'en',
            }}
            defaultCenter={mapConfig.center}
            defaultZoom={mapConfig.zoom}
            layerTypes={['TrafficLayer', 'TransitLayer']}
            options={getMapOptions()}
        >
            {RenderGoogleMapsMarkers(personMarkers)}
        </GoogleMapReact>
    );
};

export default MapView;
