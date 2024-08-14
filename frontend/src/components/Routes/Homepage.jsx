import React, { useState, useEffect } from 'react';
import Map from '../Map'
import LocationModal from '../LocationModal';

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

  useEffect(() => {
    const userLocationChoice = localStorage.getItem('allowUserLocation');
    if (userLocationChoice === null) {
      setShowModal(true);
    } else {
      setShowModal(false);
      setAllowUserLocation(userLocationChoice === 'true');
    }
  }, []);

  //if user accepts, use user's location coordinates
  const handleAccept = () => {
    setAllowUserLocation(true);
    setShowModal(false);
    localStorage.setItem('allowUserLocation', 'true');
  };

  // if user declines, use default coordinates
  const handleDecline = () => {
    setShowModal(false);
    localStorage.setItem('allowUserLocation', 'false');
  };

  const handleVendorClick = (location) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedLocation(location);
  };

  return (
    <div className='min-h-screen'>
      {showModal && <LocationModal onAccept={handleAccept} onDecline={handleDecline} />}
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
