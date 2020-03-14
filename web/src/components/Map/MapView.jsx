import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import MapMarker from './MapMarkerWithWindow';

const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';

const RenderGoogleMapsMarkers = markers => {
    const [activeMarkerId, setActiveMarkerId] = useState('');

    return markers.map(({ id, name, gender, age, address, town, phone, latLng, level }) => {
        // level 0 -> confirmed, 1 -> primary, 2 -> secondary
        const colors = ['#8b0000', '#00008B', 'yellow'];

        const onMarkerClick = targetId => {
            return setActiveMarkerId(targetId);
        };

        return (
            <MapMarker
                key={id}
                onMarkerClick={onMarkerClick}
                activeMarkerId={activeMarkerId}
                lat={latLng[0]}
                lng={latLng[1]}
                personId={id}
                name={name}
                age={age}
                gender={gender}
                address={address}
                town={town}
                phone={phone}
                color={colors[level]}
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
    const markers = personsList.map(({ id, name, gender, age, address, town, phone, location }) => {
        return {
            id,
            name,
            gender,
            age,
            address,
            town,
            phone,
            level: 2, // ToDo:
            latLng: Object.values(location.coordinates),
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
