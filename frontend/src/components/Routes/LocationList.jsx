import React from 'react'
import LocationListItem from '../Body/LocationListItem';
import NavBar from '../NavBar';
import Map from '../Map';

const LocationList = (props) => {
  const { vendors, products, locations, categories } = props;

  // if statement required to not throw TypeError: products.map is not a function
  const locationListArr = () => {
    if (Array.isArray(locations) && locations.length > 0) {
      // console.log("location list items:", locations);
      return locations.map((location) => (
        <LocationListItem key={location.id} locationData={location} />
      ));
    }
  };

  return (
    <div >
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} />
      <Map locations={locations}
        className='h-50vh w-80vw mx-auto border-2 border-custom-gray shadow-md rounded-lg' />
      <div className="flex flex-wrap">
        {locationListArr()}
      </div>
    </div>
  );
};

export default LocationList;
