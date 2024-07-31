import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ locations, center, zoom, className }) => {
  const mapRef = useRef(null);
  // const markersRef = useRef([]);

  useEffect(() => {
    // if (!mapRef.current) {
    //   mapRef.current = L.map('map').setView(center, zoom);

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

<<<<<<< HEAD
  // //show markers for corresponding locations on LocationList page
  //   useEffect(() => {
  //     if (mapRef.current) {
  //       // remove existing markers
  //       markersRef.current.forEach(marker => marker.remove());
  //       markersRef.current = [];

  //       console.log('Adding markers for locations:', locations);

  //     // add new markers
  //     locations.forEach(location => {
  //       const marker = L.marker([location.latitude, location.longitude])
  //       .addTo(mapRef.current)
  //       .bindPopup(`<p>${location.name}, ${location.city}</p>`);
  //       markersRef.current.push(marker);
  //     });
  //   }
  // }, [locations]);

  return <div id="map" className={className}></div>;
=======
  return (<div id="map" className={className}></div>);
>>>>>>> 2015c50b675ca83d4576240b1da1d1247a9b997c
};

export default Map;
