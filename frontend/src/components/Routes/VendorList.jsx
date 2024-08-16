import React from 'react';
import VendorListItem from '../Body/VendorListItem';
import { useNavigate } from 'react-router-dom';

/**
 * Component for displaying a list of vendors, grouped by ownership if the user is logged in.
 *
 * @param {Object} props - Component props
 * @param {Function} props.setVendors - Function to set the current vendors
 * @param {Array} props.allVendors - Array of all vendors
 * @param {Function} props.setProducts - Function to set the current products
 * @param {Array} props.allProducts - Array of all products
 * @param {Object} props.user - Current user object
 * @returns {JSX.Element} The rendered component
 */
const VendorList = (props) => {
  const {
    setVendors,
    allVendors,
    setProducts,
    allProducts,
    user,
  } = props;

  const navigate = useNavigate();

  /**
   * Handles click event on a vendor. Filters products by vendor and navigates to the vendor's page.
   *
   * @param {Object} vendor - The vendor object that was clicked
   */
  const handleVendorClick = (vendor) => {
    const filteredByVendor = allProducts.filter(product => product.vendor_id === vendor.id);
    const currentVendor = vendor;

    setProducts(filteredByVendor);
    setVendors([currentVendor]);

    navigate(`/vendors/${currentVendor.id}`, { state: { allProducts, allVendors } });
  };

  /**
   * Renders the list of vendors using the VendorListItem component.
   *
   * @param {Array} vendorsArray - Array of vendors to be rendered
   * @returns {JSX.Element[]} An array of VendorListItem components
   */
  const renderVendorList = (vendorsArray) => {
    return vendorsArray.map((vendor) => (
      <VendorListItem
        key={vendor.id}
        vendorData={vendor}
        onClick={() => handleVendorClick(vendor)}
        showBio={false}  // Hide bio in the vendor list
      />
    ));
  };

  const userVendors = [];
  const otherVendors = [];

  if (Array.isArray(allVendors) && allVendors.length > 0) {
    allVendors.forEach((vendor) => {
      // Check if the vendor is managed by the current user
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
          {/* Render user's vendors if they exist */}
          {userVendors.length > 0 && (
            <>
              <h2 className='text-xl font-bold m-5'>Your Vendors</h2>
              <div className='grid grid-cols-2 gap-4'>
                {renderVendorList(userVendors)}
              </div>
            </>
          )}
          {/* Render other vendors if they exist */}
          {otherVendors.length > 0 && (
            <>
              <h2 className='text-xl font-bold m-5'>Other Vendors</h2>
              <div className='grid grid-cols-2 gap-4'>
                {renderVendorList(otherVendors)}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* Render all vendors if the user is not logged in */}
          <h2 className='text-xl font-bold m-5'>All Vendors</h2>
          <div className='grid grid-cols-2 gap-4'>
            {renderVendorList(allVendors)}
          </div>
        </>
      )}
    </div>
  );
};

export default VendorList;
