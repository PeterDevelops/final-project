import React from 'react';

const VendorListItem = (props) => {
  const { vendorData } = props;

  return (
    <article className="flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-5">
      <img
        src={vendorData.vendor_logo_url}
        alt="vendor logo"
        className="w-full md:w-1/3 md:rounded-none object-cover md:object-contain"
      />
      <div className="p-5 w-full md:w-2/3">
        <h3 className="text-xl font-semibold">{vendorData.name}</h3>
        <p className="mt-2">{vendorData.bio}</p>
      </div>
    </article>
  );
};

export default VendorListItem;

