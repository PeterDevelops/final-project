import React from 'react';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom'

const VendorListItem = (props) => {
  const { vendorData, onClick } = props;
  // const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();
    onClick(vendorData);
  };

  return (
    <Link to={`/vendors/${vendorData.id}`} onClick={handleClick} >
      <article className="flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-5 overflow-hidden">
        <img
          src={vendorData.vendor_logo_url}
          alt="vendor logo"
          className="w-full md:w-1/3 md:object-cover md:object-contain"
        />
        <div className="p-5 w-full md:w-2/3">
          <h3 className="text-xl font-semibold">{vendorData.name}</h3>
          <p className="mt-2">{vendorData.bio}</p>
        </div>
      </article>
    </Link>
  );
};

export default VendorListItem;

