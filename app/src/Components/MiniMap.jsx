import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const MiniMap = ({ coordnates, size }) => {
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
            mapContainerStyle={{width: size[0], height: size[1], border: '3px solid black'}}
            center={center}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={center}/>
        </GoogleMap>
    ) : <></>
};

export default MiniMap;