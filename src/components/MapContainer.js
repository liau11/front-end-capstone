import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";


const Map = ({ cityCenter, recommendationsData }) => {
	const mapStyle = { width: "100%", height: "100vh" };

	const zoom = 13;

	var customMarker = L.icon({
		iconUrl: "https://www.freepnglogos.com/uploads/pin-png/pin-transparent-png-pictures-icons-and-png-backgrounds-30.png",
		iconSize: [30, 30],
		popupAnchor: [-3, -20]
	});

	const markers = recommendationsData.map((restaurant) => {
		return (
			<Marker
				position={[restaurant.coordinates.latitude, restaurant.coordinates.longitude]}
				icon={customMarker}
			>
				<Popup>
					<h2>{restaurant.name}</h2>
				</Popup>
			</Marker>
		)
	});

	return (
		<MapContainer center={cityCenter} zoom={zoom} style={mapStyle}>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{markers}
		</MapContainer>
	);
};


MapContainer.propTypes = {
	cityCenter: PropTypes.array.isRequired,
	recommendationsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};


export default Map;
