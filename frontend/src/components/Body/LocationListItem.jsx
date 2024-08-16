import React from 'react';

/**
 * LocationListItem component displays a single location item with vendor details.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.locationData - Data for the location to display.
 * @param {string} props.locationData.vendor_logo_url - URL of the vendor's logo image.
 * @param {string} props.locationData.name - Name of the vendor/location.
 * @param {string} props.locationData.address - Address of the vendor/location.
 * @param {string} props.locationData.city - City of the vendor/location.
 * @param {Function} props.onClick - Callback function to handle click events.
 *
 * @returns {JSX.Element} The rendered LocationListItem component.
 */
const LocationListItem = (props) => {
  const { locationData, onClick } = props;

  return (
    <article
      className='flex flex-col md:flex-row md:items-center border rounded-lg shadow-md bg-listitem bg-opacity-50 m-5 overflow-hidden cursor-pointer w-80vw'
      onClick={() => onClick(locationData)}
    >
      <img
        src={locationData.vendor_logo_url}
        alt='Vendor Logo'
        className='w-full md:w-1/3 md:object-cover md:object-contain'
      />
      <div className='p-5 w-full md:w-2/3'>
        <h2 className='text-xl font-semibold mb-2'>{locationData.name}</h2>
        <p className='text-gray-700'>{locationData.address}</p>
        <p className='text-gray-500'>{locationData.city}</p>
      </div>
    </article>
  );
};

export default LocationListItem;

