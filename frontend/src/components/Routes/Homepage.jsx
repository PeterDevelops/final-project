import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import Map from '../Map'
import LocationModal from '../LocationModal';

const Homepage = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    vendors,
    setVendors,
    allVendors,
    locations,
    categories,
    user,
    setUser,
    cartItems
  } = props;

  const [showModal, setShowModal] = useState(true);
  const [allowUserLocation, setAllowUserLocation] = useState(false);

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

  return (
    <div>
      {showModal && <LocationModal onAccept={handleAccept} onDecline={handleDecline} />}
      <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        setVendors={setVendors}
        allVendors={allVendors}
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
        cartItems={cartItems}
      />
      <Map
        locations={locations}
        zoom={12}
        className='h-50vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg mt-10'
        allowUserLocation={allowUserLocation}
      />
    </div>
  );
};

export default Homepage;
