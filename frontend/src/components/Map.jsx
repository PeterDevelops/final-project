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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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



// const Map = ({ locations, center, zoom, className }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const initializeMap = (latitude, longitude) => {
//       if (mapRef.current) {
//         mapRef.current.setView([latitude, longitude], zoom);
//       } else {
//         mapRef.current = L.map('map').setView([latitude, longitude], zoom);
//         L.tileLayer(`https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`, {
//           attribution: '&copy; <a href="https://www.thunderforest.com">Thunderforest</a>',
//           maxZoom: 19,
//         }).addTo(mapRef.current);
//       }
//     }

//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           initializeMap(latitude, longitude);
//         },
//         (error) => {
//           console.error('Error getting location:', error.message);
//           initializeMap(center[0], center[1]);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//       initializeMap(center[0], center[1]);
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [center, zoom]);
