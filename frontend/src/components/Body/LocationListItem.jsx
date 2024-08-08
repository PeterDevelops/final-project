import React from 'react'

const LocationListItem = (props) => {
  const { locationData, onClick } = props;

  return (
    <article
      className="p-6 w-80vw mx-auto rounded-lg shadow-md border border-gray-200 cursor-pointer"
      onClick={() => onClick(locationData)}
    >
      <h2 className="text-xl font-semibold mb-2">{locationData.name}</h2>
      <p className="text-gray-700">{locationData.address}</p>
      <p className="text-gray-500">{locationData.city}</p>
    </article>
  );
};

export default LocationListItem;
