import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Leaflet.css'
import { useNavigate } from 'react-router-dom'

const customIcon = new Icon ({
  iconUrl: require("../marker-icon.png"),
  iconSize: [35, 35]
});

const Map = (props) => {
  const {
    locations,
    zoom,
    className,
    allowUserLocation,
    selectedLocation,
    allProducts,
    setProducts,
    allVendors,
  } = props;

  const navigate = useNavigate();
  const [center, setCenter] = useState([49.2824, -122.8277]) // default center in port moody

  // allow geolocation based on users acceptance or denial
  useEffect(() => {
    if (allowUserLocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
      }, (error) => {
        console.error("geolocation permission denied", error);
      })
    }
  }, [allowUserLocation]);

  // center map based on users selected location
  useEffect(() => {
    if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
      setCenter([selectedLocation.latitude, selectedLocation.longitude]);
    }
  }, [selectedLocation]);

  // function to navigate to vendor's profile page from marker popup
  const handleNavigateToVendorProfile = (vendorId) => {
    if (vendorId) {
      console.log('Button clicked, vendorId:', vendorId);
      const filteredByVendor = allProducts.filter(product => product.vendor_id === vendorId);
      setProducts(filteredByVendor);
      navigate(`/vendors/${vendorId}`, { state: { allProducts } });
    }
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className={className}
      // allowUserLocation={allowUserLocation} idk
      key={`${center[0]}-${center[1]}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.thunderforest.com">Thunderforest</a>'
        url={`https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`}
      />
      {allVendors.map((location) => {
        // console.log("location data:", location);
        return (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={customIcon}
          >
            <Popup>
              <div>
                <h2>{location.name}</h2>
                <p>{location.city}</p>
                <button
                  onClick={() => handleNavigateToVendorProfile(location.id)}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                >
                  View Vendor Profile
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
