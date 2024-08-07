import React from 'react';
import NavBar from '../NavBar';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';

const VendorProfile = (props) => {
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
    setUser
  } = props;

  const navigate = useNavigate();
  const vendor = vendors.length > 0 ? vendors[0] : null;

  const handleEdit = () => {
    if (vendor) {
      navigate(`/vendors/edit/${vendor.id}`, { state: { vendor } });
    }
  };

  const handleDelete = () => {
    if (vendor) {
    // Logic for handling delete action
    console.log('Delete vendor', vendor.id);
    }
  };

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
      />
      <div className="vendor-profile flex flex-col md:flex-row md:items-center border rounded-lg shadow-md m-5 overflow-hidden">
        <img src={vendor.vendor_logo_url} alt={vendor.name} className="w-full md:w-1/3 md:object-cover md:object-contain" />
        <div className="p-5 w-full md:w-2/3">
          <h3 className="text-xl font-semibold">{vendor.name}</h3>
          <p className="mt-2">{vendor.bio}</p>
          {user && user.id === vendor.admin_user && (
            <div className="mt-4">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <ProductList
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
                showNavBar={false}
      />
    </div>
  );
};

export default VendorProfile;
