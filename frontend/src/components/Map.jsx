import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ center, zoom, className }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], zoom);
      } else {
        mapRef.current = L.map('map').setView([latitude, longitude], zoom);

        L.tileLayer(`https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`, {
          attribution: '&copy; <a href="https://www.thunderforest.com">Thunderforest</a>',
        }).addTo(mapRef.current);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          initializeMap(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
          initializeMap(center[0], center[1]);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      initializeMap(center[0], center[1]);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom]);

  return (<div id="map" className={className}></div>);
};

export default Map;

