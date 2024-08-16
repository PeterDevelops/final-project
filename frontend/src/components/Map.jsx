import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Leaflet.css';
import { useNavigate } from 'react-router-dom';
import VendorListItem from './Body/VendorListItem';
import VendorsInBoundsUpdater from './Body/VendorInBoundsUpdater';

// Create a custom icon for the map markers
const customIcon = new Icon({
  iconUrl: require('../marker-icon.png'),
  iconSize: [35, 35],
});

/**
 * Map component displaying vendors on a map and a list of vendors.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.allowUserLocation - Whether to allow user location tracking
 * @param {Object} props.selectedLocation - Selected location object with latitude and longitude
 * @param {Array} props.allProducts - Array of all products
 * @param {Function} props.setProducts - Function to set the products state
 * @param {Array} props.vendors - Array of vendors currently in bounds of the map
 * @param {Function} props.setVendors - Function to set the vendors state
 * @param {Array} props.allVendors - Array of all vendors
 * @param {Function} props.onVendorClick - Function to handle a vendor click event
 * @returns {JSX.Element} The rendered map component
 */
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

  // Set the initial center of the map to Port Moody
  const [center, setCenter] = useState([49.277321, -122.888835]);

  // Update the map center if user location is allowed and available
  useEffect(() => {
    if (allowUserLocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Geolocation permission denied', error);
        }
      );
    }
  }, [allowUserLocation]);

  // Update the map center if a new location is selected
  useEffect(() => {
    if (selectedLocation && selectedLocation.latitude && selectedLocation.longitude) {
      setCenter([selectedLocation.latitude, selectedLocation.longitude]);
    }
  }, [selectedLocation]);

  /**
   * Handles vendor click to center the map on the vendor's location.
   *
   * @param {Object} vendor - Vendor object
   */
  const handleVendorClick = (vendor) => {
    const vendorLocation = {
      latitude: vendor.latitude,
      longitude: vendor.longitude,
    };
    onVendorClick(vendorLocation);
  };

  /**
   * Generates a list of VendorListItem components for vendors within map bounds.
   *
   * @returns {JSX.Element[]} Array of VendorListItem components
   */
  const vendorsOnMapList = () => {
    if (Array.isArray(vendors) && vendors.length > 0) {
      return vendors.map((vendor) => (
        <VendorListItem key={vendor.id} vendorData={vendor} onClick={() => handleVendorClick(vendor)} />
      ));
    }
  };

  /**
   * Navigates to the vendor profile page and updates the products and vendors state.
   *
   * @param {number} vendorId - ID of the vendor
   */
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
      {/* MapContainer component for rendering the map */}
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={true}
        className='h-35vh mx-auto mb-6 border-2 border-custom-gray shadow-md rounded-lg'
        key={`${center[0]}-${center[1]}`}
      >
        {/* TileLayer component for the map tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.thunderforest.com">Thunderforest</a>'
          url={`https://{s}.tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=${process.env.REACT_APP_THUNDERFOREST_API_KEY}`}
        />

        {/* VendorsInBoundsUpdater component to update the vendors list based on map bounds */}
        <VendorsInBoundsUpdater
          allVendors={allVendors}
          setVendors={setVendors}
        />

        {/* Render markers for each vendor on the map */}
        {allVendors.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={customIcon}
          >
            {/* Popup component for each marker */}
            <Popup>
              <div className="flex flex-col items-center">
                <h2 className="font-heading font-bold text-sm m-0 whitespace-nowrap">{location.name}</h2>
                <div className="w-28 h-8 overflow-hidden">
                  <img className="w-full h-full object-cover" src={location.vendor_logo_url} alt={`${location.name} logo`} />
                </div>
                <p className="font-body text-[10px] text-wrap text-left"
                  style={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: '2',
                    textOverflow: 'ellipsis',
                    maxHeight: '3rem',
                    lineHeight: '1rem',
                  }}>
                  {location.bio}
                </p>
                <button
                  onClick={() => handleNavigateToVendorProfile(location.id)}
                  className='px-3 py-1.5 bg-yellow-500 text-black rounded font-body text-xs'
                >
                  Visit Booth
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Render a list of vendors currently visible on the map */}
      <div className='grid grid-cols-2 gap-1 mt-2 w-80vw mx-auto'>
        {vendorsOnMapList()}
      </div>
    </>
  );
};

export default Map;
