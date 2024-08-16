import React, { useState, useEffect } from 'react';
import Map from '../Map';
import LocationModal from '../LocationModal';

/**
 * Homepage component that renders a map and handles user location preferences.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setProducts - Function to set the products list
 * @param {Array} props.allProducts - Array of all products
 * @param {Array} props.vendors - Array of current vendors
 * @param {Function} props.setVendors - Function to set the vendors list
 * @param {Array} props.allVendors - Array of all vendors
 * @param {Array} props.locations - Array of locations for the map
 * @returns {JSX.Element} The rendered Homepage component
 */
const Homepage = (props) => {
  const {
    setProducts,
    allProducts,
    vendors,
    setVendors,
    allVendors,
    locations,
  } = props;

  const [showModal, setShowModal] = useState(true);
  const [allowUserLocation, setAllowUserLocation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  /**
   * useEffect to check the user's location preference from localStorage.
   * If the user hasn't made a choice, show the modal; otherwise, set the state accordingly.
   */
  useEffect(() => {
    const userLocationChoice = localStorage.getItem('allowUserLocation');
    if (userLocationChoice === null) {
      setShowModal(true);
    } else {
      setShowModal(false);
      setAllowUserLocation(userLocationChoice === 'true');
    }
  }, []);

  /**
   * Handles the acceptance of location permission.
   * Sets the permission in state and localStorage.
   */
  const handleAccept = () => {
    setAllowUserLocation(true);
    setShowModal(false);
    localStorage.setItem('allowUserLocation', 'true');
  };

  /**
   * Handles the decline of location permission.
   * Sets the state to use default coordinates and hides the modal.
   */
  const handleDecline = () => {
    setShowModal(false);
    localStorage.setItem('allowUserLocation', 'false');
  };

  /**
   * Handles the click event on a vendor's location on the map.
   * Scrolls the window to the top and sets the selected location.
   *
   * @param {Object} location - The location object of the clicked vendor
   */
  const handleVendorClick = (location) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedLocation(location);
  };

  return (
    <div className='min-h-screen'>
      {/* Show the location permission modal if needed */}
      {showModal && <LocationModal onAccept={handleAccept} onDecline={handleDecline} />}

      {/* Render the map component, passing necessary props */}
      <Map
        locations={locations}
        allowUserLocation={allowUserLocation}
        allProducts={allProducts}
        setProducts={setProducts}
        vendors={vendors}
        setVendors={setVendors}
        allVendors={allVendors}
        onVendorClick={handleVendorClick}
        selectedLocation={selectedLocation}
      />
    </div>
  );
};

export default Homepage;
