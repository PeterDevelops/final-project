import React, { useState } from 'react'
import LocationListItem from '../Body/LocationListItem';
import NavBar from '../NavBar';
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
    setSelectedLocation(location);
  };

  // if statement required to not throw TypeError: products.map is not a function
  const locationListArr = () => {
    if (Array.isArray(locations) && locations.length > 0) {
      return locations.map((location) => (
        <LocationListItem
          key={location.id}
          locationData={location}
          onClick={handleLocationClick} />
      ));
    }
  };

  return (
    <div >
      {/* <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        setVendors={setVendors}
        allVendors={allVendors}
        locations={locations}
        categories={categories}
        cartItems={cartItems}
      /> */}
      <div className="flex justify-center my-4">
        <Map
          locations={locations}
          zoom={12}
          selectedLocation={selectedLocation}
          className='h-50vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg'
        />
      </div>
      <div className="flex flex-col items-center space-y-4">
        {locationListArr()}
      </div>
    </div>
  );
};

export default LocationList;
