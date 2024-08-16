import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * VendorProfile component displays the profile of a vendor, including their details and products.
 *
 * @param {Object} props - Component props
 * @param {Array} props.vendors - Array of vendors
 * @param {Function} props.setVendors - Function to set vendors
 * @param {Array} props.allVendors - Array of all vendors
 * @param {Function} props.setAllVendors - Function to set all vendors
 * @param {Array} props.products - Array of products associated with the vendor
 * @param {Function} props.setProducts - Function to set products
 * @param {Array} props.allProducts - Array of all products
 * @param {Function} props.setAllProducts - Function to set all products
 * @param {Array} props.locations - Array of vendor locations
 * @param {Array} props.categories - Array of product categories
 * @param {Object} props.user - Current user object
 * @param {Function} props.setUser - Function to set user
 * @param {Array} props.cartItems - Array of items in the cart
 * @param {Function} props.setCartItems - Function to set cart items
 * @param {Object} props.quantities - Object containing product quantities
 * @param {Function} props.setQuantities - Function to set product quantities
 * @returns {JSX.Element} The rendered component
 */
const VendorProfile = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    setAllProducts,
    vendors,
    allVendors,
    setAllVendors,
    user,
    cartItems,
    setCartItems,
    quantities,
    setQuantities,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const [vendor, setVendor] = useState({});

  /**
   * useEffect to set the vendor based on location state or the first vendor in the list.
   */
  useEffect(() => {
    if (location.state.vendor) {
      setVendor(location.state.vendor);
    } else {
      const vendorData = vendors[0];
      setVendor(vendorData);
    }
  }, [location.state.vendor, vendors]);

  /**
   * useEffect to filter and set products for the current vendor.
   */
  useEffect(() => {
    if (location.state.allProducts && vendor) {
      const listOfProducts = location.state.allProducts;
      const vendorsProducts = listOfProducts.filter(
        (product) => product.vendor_id === vendor.id
      ); // Filter products belonging to the current vendor
      setAllProducts(location.state.allProducts); // Set all products
      setProducts(vendorsProducts); // Set products specific to the vendor
    }
  }, [location.state.allProducts, vendor]); // Re-run if allProducts or vendor changes

  /**
   * Handles navigation to the vendor edit page.
   */
  const handleEdit = () => {
    if (vendor) {
      navigate(`/vendors/edit/${vendor.id}`, { state: { vendor } });
    }
  };

  /**
   * Handles deletion of the current vendor.
   */
  const handleDelete = () => {
    if (vendor) {
      const confirmed = window.confirm(
        'Are you sure you want to delete this vendor?'
      );
      if (confirmed) {
        // Send DELETE request to the API to remove the vendor
        fetch(`/api/vendors`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: vendor.id }),
        })
          .then((response) => {
            if (response.ok) {
              setAllVendors(allVendors.filter((v) => v.id !== vendor.id)); // Remove the vendor from the list
              navigate('/vendors', { state: { allVendors } }); // Navigate back to the vendors list
            } else {
              console.error('Failed to delete vendor');
            }
          })
          .catch((err) => {
            console.error('Error deleting vendor:', err.message);
          });
      }
    }
  };

  /**
   * Handles navigation to the chat page with the current vendor.
   */
  const handleNavigateToChat = () => {
    if (user) {
      axios
        .get('/api/chats/', { params: { userId: user.id, vendorId: vendor.id } })
        .then((chatObj) => {
          const chatResults = chatObj.data[0].chat;
          const vendorResults = chatObj.data[0].vendor;
          if (chatResults.length > 0) {
            // If a chat already exists, navigate to the chat page
            navigate(`/chats/${chatResults[0].id}`, {
              state: {
                chat: vendorResults,
                vendor: vendor,
                allProducts: allProducts,
              },
            });
          } else {
            // If no chat exists, create a new chat and then navigate
            axios
              .post('/api/chats/new', {
                userId: user.id,
                vendorUserId: vendorResults.vendor_user_id,
              })
              .then((results) => {
                navigate(`/chats/${results.data.id}`, {
                  state: {
                    chat: {
                      contact_name: vendor.name,
                      contact_photo: vendor.vendor_logo_url,
                      vendor: vendor,
                    },
                    allProducts: allProducts,
                  },
                });
              });
          }
        })
        .catch((err) => {
          console.log('Find a chat axios error:', err);
        });
    } else {
      navigate('/inbox'); // If user is not logged in, navigate to the inbox
    }
  };

  return (
    <div>
      {/* Render the vendor profile and product list if a vendor is selected */}
      {vendor && (
        <>
          {/* Vendor profile display */}
          <div className="vendor-profile flex flex-col items-center rounded-lg m-5 overflow-hidden">
            <div className="relative w-80 h-80">
              <img
                src={vendor.vendor_logo_url}
                alt={vendor.name}
                className="object-cover object-center border shadow rounded-full w-full h-full"
              />
            </div>
            <div className="p-5 w-full md:w-2/3 mx-auto">
              <h3 className="text-xl font-semibold text-center">
                {vendor.name}
              </h3>
              <p className="mt-2 text-center">{vendor.bio}</p>
              {user && user.id === vendor.admin_user ? (
                // Buttons for editing or deleting the vendor, only visible to the vendor admin
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleEdit}
                    className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
              ) : (
                // Button to contact the vendor, visible to all users
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleNavigateToChat}
                    className="mr-2 px-4 py-2 text-white rounded"
                    style={{
                      backgroundColor: vendor.id === 12 ? '#BB00BB' : 'green',
                      color: 'white',
                    }}
                  >
                    Contact Vendor
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Render the ProductList component */}
          <ProductList
            products={products}
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            vendors={vendors}
            allVendors={allVendors}
            user={user}
            cartItems={cartItems}
            setCartItems={setCartItems}
            quantities={quantities}
            setQuantities={setQuantities}
          />
        </>
      )}
    </div>
  );
};

export default VendorProfile;
