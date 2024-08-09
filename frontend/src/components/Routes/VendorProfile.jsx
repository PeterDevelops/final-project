import React from 'react';
import NavBar from '../NavBar';
import ProductList from './ProductList';
import { useNavigate } from 'react-router-dom';

const VendorProfile = (props) => {
  const {
    vendors,
    setVendors,
    allVendors,
    setAllVendors,
    products,
    setProducts,
    allProducts,
    setAllProducts,
    locations,
    categories,
    user,
    setUser,
    cartItems,
    setCartItems,
    setQuantities
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
      const confirmed = window.confirm('Are you sure you want to delete this vendor?');
      if (confirmed) {
        fetch(`/api/vendors`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: vendor.id }),
        })
        .then(response => {
          if (response.ok) {
            setAllVendors(allVendors.filter(v => v.id !== vendor.id));
            navigate('/vendors', { state: { allVendors }});
          } else {
            console.error('Failed to delete vendor');
          }
        })
        .catch(err => {
          console.error('Error deleting vendor:', err.message);
        });
      }
    }
  };

  return (
    <div>
      {/* <NavBar
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
      /> */}
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
                setAllProducts={setAllProducts}
                vendors={vendors}
                setVendors={setVendors}
                allVendors={allVendors}
                locations={locations}
                categories={categories}
                user={user}
                setUser={setUser}
                showNavBar={false}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setQuantities={setQuantities}
      />
    </div>
  );
};

export default VendorProfile;
