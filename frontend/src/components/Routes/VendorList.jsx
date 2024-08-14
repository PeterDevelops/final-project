import React from 'react'
import VendorListItem from '../Body/VendorListItem';
import { useNavigate } from 'react-router-dom'

const VendorList = (props) => {
  const {
    setVendors,
    allVendors,
    setProducts,
    allProducts,
    user,
  } = props;

  const navigate = useNavigate();

  const handleVendorClick = (vendor) => {
    const filteredByVendor = allProducts.filter(product => product.vendor_id === vendor.id);
    const currentVendor = vendor;

    setProducts(filteredByVendor);
    setVendors([currentVendor]);
    navigate(`/vendors/${currentVendor.id}`, { state: { allProducts, allVendors } });
  };

  const renderVendorList = (vendorsArray) => {
    return vendorsArray.map((vendor) => (
      <VendorListItem key={vendor.id} vendorData={vendor} onClick={() => handleVendorClick(vendor)} showBio={false}/>
    ));
  };

  const userVendors = [];
  const otherVendors = [];

  if (Array.isArray(allVendors) && allVendors.length > 0) {
    allVendors.forEach((vendor) => {
      if (user && vendor.admin_user === user.id) {
        userVendors.push(vendor);
      } else {
        otherVendors.push(vendor);
      }
    });
  }

  return (
    <div>
      {user ? (
        <>
          {userVendors.length > 0 && (
            <>
              <h2 className='text-xl font-bold m-5' >Your Vendors</h2>
              <div className='grid grid-cols-2 gap-4'>
              {renderVendorList(userVendors)}
              </div>
            </>
          )}
          {otherVendors.length > 0 && (
            <>
              <h2 className='text-xl font-bold m-5' >Other Vendors</h2>
              <div className='grid grid-cols-2 gap-4'>
              {renderVendorList(otherVendors)}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <h2 className='text-xl font-bold m-5' >All Vendors</h2>
          <div className='grid grid-cols-2 gap-4'>
          {renderVendorList(allVendors)}
          </div>
        </>
      )}
    </div>
  );
};

export default VendorList;
