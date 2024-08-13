import React from 'react';
import { Link } from 'react-router-dom';

const VendorListItem = (props) => {
  const { vendorData, onClick, showBio } = props;

  const handleClick = (event) => {
    event.preventDefault();
    onClick(vendorData);
  };

  return (
    <Link to={`/vendors/${vendorData.id}`} onClick={handleClick} >
      <article className="flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-2 overflow-hidden h-48">
        <div className="w-full md:w-3/4 h-full flex">
        <img
          src={vendorData.vendor_logo_url}
          alt="vendor logo"
          className="w-full h-full object-cover"
        />
        </div>
        <div className="p-2 w-full md:w-1/4 flex flex-col justify-center h-full bg-listitem bg-opacity-60">
          <h3 className="text-base text-center font-semibold">{vendorData.name}</h3>
          {showBio && <p className="mt-2 text-center">{vendorData.bio}</p>}
        </div>
      </article>
    </Link>
  );
};

export default VendorListItem;

