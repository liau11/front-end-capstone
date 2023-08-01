import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Map = ({recommendationsData}) => {
    const mapStyle = { width: "100%", height: "500px" };

    const center = [47.6206, -122.3505];
    const zoom = 13;

    const markers = recommendationsData.map((restaurant) => {
        return (
        <Marker position={[restaurant.coordinates.latitude, restaurant.coordinates.longitude]}>
            <Popup>
                <h2>{restaurant.name}</h2>
            </Popup>
        </Marker>
        )}
    );

    return (
        <MapContainer center={center} zoom={zoom} style={mapStyle}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers}
        </MapContainer>
    );
};

export default Map;
