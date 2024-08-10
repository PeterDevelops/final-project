import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import QuantityInput from './QuantityInput';

const ProductListItem = (props) => {
  const {
    productData,
    allProducts,
    setAllProducts,
    user,
    vendors,
    allVendors,
    cartItems,
    setCartItems,
    quantities,
    setQuantities
  } = props;

  const [quantity, setQuantity] = useState(() => {
    const existingItem = cartItems.find(item => item.product_id === productData.id);
    return existingItem ? existingItem.quantity : 1;
  });

  const [isAdded, setIsAdded] = useState(() => {
    return cartItems.some(item => item.product_id === productData.id);
  });

  const navigate = useNavigate();
  const vendor = allVendors.find(v => v.id === productData.vendor_id);

  // Add or update item in cart
  const updateCart = (product, qty) => {
    const vendor = vendors.find(vendor => vendor.id === product.vendor_id);
    const itemExist = cartItems.find(item => item.product_id === product.id);
    let updatedCartItems;

    if (itemExist) {
      updatedCartItems = cartItems.map(item =>
        item.product_id === product.id ? { ...item, quantity: qty } : item
      );
    } else {
      const newItem = {
        cart_item_id: cartItems.length + 1,
        price_cents: product.price_cents,
        product_id: product.id,
        product_name: product.name,
        product_photo_url: product.photo_url,
        quantity: qty,
        vendor_address: vendor?.address,
        vendor_city: vendor?.city,
        vendor_logo_url: vendor?.vendor_logo_url,
        vendor_name: vendor?.name
      };
      updatedCartItems = [...cartItems, newItem];
    }
    setCartItems(updatedCartItems);

    // update quantities state
    const updatedQuantities = { ...quantities };
    updatedCartItems.forEach(item => {
      updatedQuantities[item.cart_item_id] = item.quantity;
    });
    setQuantities(updatedQuantities);
  };

  const handleAddToCart = () => {
    if (!isAdded) {
      updateCart(productData, 1);
      setIsAdded(true);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    updateCart(productData, newQuantity);
  };

  const handleEdit = () => {
    if (productData && vendor) {
      navigate(`/products/edit/${productData.id}`, { state: { product: productData } });
    }
  };

  const handleDelete = () => {
    if (productData && vendor) {
      const confirmed = window.confirm('Are you sure you want to delete this product?');
      if (confirmed) {
        fetch(`/api/products`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productData.id }),
        })
        .then(response => {
          if (response.ok) {
            setAllProducts(allProducts.filter(p => p.id !== productData.id));
            navigate('/vendors', { state: { allProducts }});
          } else {
            console.error('Failed to delete product');
          }
        })
        .catch(err => {
          console.error('Error deleting product:', err.message);
        });
      }
    }
  };

  const isProductOwnedByUser = user && vendor && user.id === vendor.admin_user;

  return (
    <article className="flex flex-col md:flex-row md:items-stretch border rounded-lg shadow-md bg-[#F7F4F0] bg-opacity-50 m-5 overflow-hidden ">
      <img
        src={productData.photo_url}
        alt={`${productData.name} image`}
        className="w-full md:w-1/3 md:object-cover md:object-contain"
      />
      <div className="p-5 w-full md:w-2/3">
        <h1 className="text-xl font-semibold">{productData.name}</h1>
        <p className="mt-2">Description: {productData.description}</p>
        <h3 className="mt-2 text-lg font-bold">${(productData.price_cents / 100.00).toFixed(2)}</h3>
        {isProductOwnedByUser ? (
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
        ) : (
          <div className="mt-4">
            {!isAdded ? (
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <QuantityInput defaultQuantity={quantity} onChange={handleQuantityChange} />
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

export default ProductListItem;

