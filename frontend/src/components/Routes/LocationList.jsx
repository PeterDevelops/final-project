import React, { useState } from 'react';
import LocationListItem from '../Body/LocationListItem';
import Map from '../Map';

/**
 * Component for displaying a list of locations along with a map.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setVendors - Function to update vendors
 * @param {Array} props.allVendors - Array of all vendors
 * @param {Function} props.setProducts - Function to update products
 * @param {Array} props.allProducts - Array of all products
 * @param {Array} props.locations - Array of location objects to display on the map
 * @returns {JSX.Element} The rendered component
 */
const LocationList = (props) => {
  const {
    setVendors,
    allVendors,
    setProducts,
    allProducts,
    locations,
  } = props;

  const [selectedLocation, setSelectedLocation] = useState(null);

  /**
   * Handles the click event on a location item.
   * Scrolls to the top of the page and sets the clicked location as selected.
   *
   * @param {Object} location - The clicked location object
   */
  const handleLocationClick = (location) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedLocation(location);
  };

  /**
   * Generates a list of location items.
   * Ensures `allVendors` is an array before mapping to avoid errors.
   *
   * @returns {JSX.Element[]|null} Array of `LocationListItem` components or null
   */
  const locationListArr = () => {
    // Check if allVendors is an array and contains elements
    if (Array.isArray(allVendors) && allVendors.length > 0) {
      return allVendors.map((location) => (
        <LocationListItem
          key={location.id}
          locationData={location}
          onClick={handleLocationClick}
        />
      ));
    }
    // Return null if allVendors is not a valid array or is empty
    return null;
  };

  return (
    <div>
      {/* Map component to display locations on the map */}
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

      {/* List of location items below the map */}
      <div className='flex flex-col items-center space-y-4'>
        {locationListArr()}
      </div>
    </div>
  );
};

export default LocationList;
