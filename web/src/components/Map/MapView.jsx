import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

import MapMarker from './MapMarkerWithWindow';

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

const RenderGoogleMapsMarkers = markers => {
    const [activeMarkerId, setActiveMarkerId] = useState('');

    return markers.map(({ id, latlng, name, age, gender, address, contact, level }) => {
        // level 1 -> confirmed, 2 -> primary, 3 -> secondary
        const colors = ['#8b0000', '#00008B', 'yellow'];

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

const MapView = ({ personsList }) => {
    const markers = personsList.map(({ id, name, age, district, town }, index) => {
        return {
            id,
            name,
            level: 3, // ToDo:
            latlng: [9.2095432 + index * 0.1, 76.75673], // ToDo:
            age,
            district,
            town,
            gender: 'M',
            address: '223B Baker Street',
            contact: 9999999999,
        };
    });

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
            {RenderGoogleMapsMarkers(markers)}
        </GoogleMapReact>
    );
};

export default MapView;
