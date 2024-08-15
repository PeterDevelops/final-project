import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Leaflet.css';
import { useNavigate } from 'react-router-dom';
import VendorListItem from './Body/VendorListItem';
import VendorsInBoundsUpdater from './Body/VendorInBoundsUpdater';

const customIcon = new Icon({
  iconUrl: require('../marker-icon.png'),
  iconSize: [35, 35],
});

const Map = (props) => {
  const {
    allowUserLocation,
    selectedLocation,
    allProducts,
    setProducts,
    vendors,
    setVendors,
    allVendors,
    onVendorClick,
  } = props;

  const navigate = useNavigate();
  const [center, setCenter] = useState([49.277321, -122.888835]); // default center in Port Moody

  useEffect(() => {
    if (allowUserLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('geolocation permission denied', error);
        }
      );
    }
  }, [allowUserLocation]);

  useEffect(() => {
    if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
      setCenter([selectedLocation.latitude, selectedLocation.longitude]);
    }
  }, [selectedLocation]);

  // handle vendor click to center map on location instead of navigate to vendor profile
  const handleVendorClick = (vendor) => {
    const vendorLocation = {
      latitude: vendor.latitude,
      longitude: vendor.longitude,
    };
    onVendorClick(vendorLocation);
  };

  const vendorsOnMapList = () => {
    if (Array.isArray(vendors) && vendors.length > 0) {
      return vendors.map((vendor) => (
        <VendorListItem key={vendor.id} vendorData={vendor} onClick={() => handleVendorClick(vendor)} />
      ));
    }
  };

  const handleNavigateToVendorProfile = (vendorId) => {
    if (vendorId) {
      const filteredByVendor = allProducts.filter(product => product.vendor_id === vendorId);
      const currentVendor = allVendors.filter(vendor => vendor.id === vendorId);
      setVendors(currentVendor);
      setProducts(filteredByVendor);
      navigate(`/vendors/${vendorId}`, { state: { allProducts } });
    }
  };

  return (
    <>
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        className='h-35vh mx-2 mt-4 border-2 border-custom-gray shadow-md rounded-lg'
        key={`${center[0]}-${center[1]}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.thunderforest.com">Thunderforest</a>'
          url={`https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`}
        />

        <VendorsInBoundsUpdater
          allVendors={allVendors}
          setVendors={setVendors}
        />

        {allVendors.map((location) => (
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
                  className='mt-2 px-3 py-1 bg-blue-500 text-white rounded'
                >
                  View Vendor Profile
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className='grid grid-cols-2 gap-1 mt-3 w-80vw mx-auto'>
        {vendorsOnMapList()}
      </div>
    </>
  );
};

export default Map;
