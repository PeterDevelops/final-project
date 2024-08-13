import React, { useState } from 'react'
import LocationListItem from '../Body/LocationListItem';
import Map from '../Map';

const LocationList = (props) => {
  const {
    vendors,
    setVendors,
    allVendors,
    products,
    allProducts,
    setProducts,
    locations,
    categories,
    cartItems,
  } = props;

  const [selectedLocation, setSelectedLocation] = useState(null);

  // use state to determine clicked location
  const handleLocationClick = (location) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedLocation(location);
  };

  // if statement required to not throw TypeError: products.map is not a function
  const locationListArr = () => {
    if (Array.isArray(allVendors) && allVendors.length > 0) {
      return allVendors.map((location) => (
        <LocationListItem
          key={location.id}
          locationData={location}
          onClick={handleLocationClick} />
      ));
    }
  };

  return (
    <div>
        <Map
          locations={locations}
          zoom={12}
          selectedLocation={selectedLocation}
          className='h-35vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg mt-10'
          allProducts={allProducts}
          setProducts={setProducts}
          allVendors={allVendors}
          setVendors={setVendors}
        />
      <div className="flex flex-col items-center space-y-4">
        {locationListArr()}
      </div>
    </div>
  );
};

export default LocationList;
