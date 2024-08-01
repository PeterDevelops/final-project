import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Map = ({ locations, center, zoom, className }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  console.log("props values:----", locations, center, zoom, className);

  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      if (mapRef.current) {
        mapRef.current.setView([latitude, longitude], zoom);
      } else {
        mapRef.current = L.map('map').setView([latitude, longitude], zoom);
    // if (!mapRef.current) {
    //   mapRef.current = L.map('map').setView(center, zoom);

      L.tileLayer(`https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`, {
        attribution: '&copy; <a href="https://www.thunderforest.com">Thunderforest</a>',
        maxZoom: 19,
      }).addTo(mapRef.current);
      }
    }

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

  useEffect(() => {
    // remove markers from map
    if (mapRef.current) {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      console.log('locations:-----', locations);
    // iterate over locations array to create new marker for each locations
      locations.forEach(location => {
        const latitude = parseFloat(location.latitude);
        const longitude = parseFloat(location.longitude);
        const marker = L.marker([latitude, longitude])
          .addTo(mapRef.current) // add marker to map
          .bindPopup(`<p>${location.name}, ${location.city}</p>`);
          // add marker to markers array
          markersRef.current.push(marker);
      });
    }
  }, [locations]);

  return <div id="map" className={className}></div>;
};

export default Map;
