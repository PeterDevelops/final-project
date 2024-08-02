import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new Icon ({
  iconUrl: require("../marker-icon.png"),
  iconSize: [35, 35]
});

const Map = ({ locations, zoom, className }) => {
  const [center, setCenter] = useState([49.2824, -122.8277]) // default center in port moody

  useEffect (() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter([position.coords.latitude, position.coords.longitude]);
    }, (error) => {
      console.error("geolocation permission denied", error);
    })
  }, []);

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className={className} key={`${center[0]}-${center[1]}`} >
      <TileLayer
        attribution='&copy; <a href="https://www.thunderforest.com">Thunderforest</a>'
        url={`https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`}
      />
      {locations.map((location) => (
        <Marker key={location.id} position={[location.latitude, location.longitude]} icon={customIcon }>
          <Popup>
            {location.name}, {location.city}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
