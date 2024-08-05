import React, { useState } from 'react';
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
    setUser
  } = props;

  const [showModal, setShowModal] = useState(true);
  const [allowUserLocation, setAllowUserLocation] = useState(false);

  //if user accepts, use user's location coordinates
  const handleAccept = () => {
    setAllowUserLocation(true);
    setShowModal(false);
  };

  // if user declines, use default coordinates
  const handleDecline = () => {
    setShowModal(false);
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
