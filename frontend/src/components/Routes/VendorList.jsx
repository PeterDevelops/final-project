import React from 'react'
import VendorListItem from '../Body/VendorListItem';
import NavBar from '../NavBar';
import { useNavigate } from 'react-router-dom'

const VendorList = (props) => {
  const {
    vendors,
    setVendors,
    allVendors,
    products,
    setProducts,
    allProducts,
    locations,
    categories,
    user,
    setUser,
    cartItems,
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
      <VendorListItem key={vendor.id} vendorData={vendor} onClick={() => handleVendorClick(vendor)} />
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
      <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        setVendors={setVendors}
        allVendors={allVendors}
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
        cartItems={cartItems}
      />
      {user ? (
        <>
          {userVendors.length > 0 && (
            <>
              <h2 className="text-xl font-bold m-5" >Your Vendors</h2>
              {renderVendorList(userVendors)}
            </>
          )}
          {otherVendors.length > 0 && (
            <>
              <h2 className="text-xl font-bold m-5" >Other Vendors</h2>
              {renderVendorList(otherVendors)}
            </>
          )}
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold m-5" >All Vendors</h2>
          {renderVendorList(allVendors)}
        </>
      )}
    </div>
  );
};

export default VendorList;
