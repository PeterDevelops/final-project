import React from 'react'

const LocationListItem = (props) => {
  const { locationData } = props;

  return (
    <article className="location-item">
      <h1>{locationData.name}</h1>
      <p>{locationData.address}</p>
      <p>{locationData.city}</p>
    </article>
  )
};

export default LocationListItem;
