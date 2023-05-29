import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
const containerStyle = {   width: '400px',   height: '400px' };

const MiniMap = ({ coordnates }) => {
    // define a key para utilizar a api
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    });
    
    // inicializa e monta o mapa
    const center = {lat: coordnates[0], lng: coordnates[1]};
    const [map, setMap] = React.useState(null);
    const onLoad = React.useCallback(function callback(map) {
        setMap(map);
    }, []);
    
    const onUnmount = React.useCallback(function callback(map) {
        setMap(null);
    }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
        </GoogleMap>
    ) : <></>
};

export default MiniMap;