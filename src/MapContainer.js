import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

const Map = () => {
    const mapStyle = { width: "100%", height: "500px" };

    const center = [47.6206, -122.3505];
    const zoom = 13;

    return (
        <MapContainer center={center} zoom={zoom} style={mapStyle}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={center}>
                <Popup>
                    HI SOPHIA!!!<br />
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
