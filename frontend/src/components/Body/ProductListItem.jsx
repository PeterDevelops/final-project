import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuantityInput from './QuantityInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

/**
 * ProductListItem component represents a product in a list and allows interaction such as adding to cart,
 * changing quantity, and editing or deleting the product if the user owns it.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.productData - The data of the product being displayed.
 * @param {Array} props.allProducts - List of all products.
 * @param {Function} props.setAllProducts - Function to update the list of all products.
 * @param {Object} props.user - The currently logged-in user.
 * @param {Array} props.vendors - List of vendors.
 * @param {Array} props.allVendors - List of all vendors.
 * @param {Array} props.cartItems - List of items currently in the cart.
 * @param {Function} props.setCartItems - Function to update the list of cart items.
 * @param {Object} props.quantities - Object mapping cart item IDs to their quantities.
 * @param {Function} props.setQuantities - Function to update the quantities state.
 *
 * @returns {JSX.Element} The rendered ProductListItem component.
 */
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

  const [isAdded, setIsAdded] = useState(() => cartItems.some(item => item.product_id === productData.id));

  const navigate = useNavigate();
  const vendor = allVendors.find(v => v.id === productData.vendor_id);

  /**
   * Updates the cart with the specified product and quantity.
   *
   * @param {Object} product - The product to be updated or added.
   * @param {number} qty - The quantity of the product.
   */
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

    // Update quantities state
    const updatedQuantities = { ...quantities };
    updatedCartItems.forEach(item => {
      updatedQuantities[item.cart_item_id] = item.quantity;
    });
    setQuantities(updatedQuantities);
  };

  /**
   * Handles adding the product to the cart.
   */
  const handleAddToCart = () => {
    if (!isAdded) {
      updateCart(productData, 1);
      setIsAdded(true);
    }
  };

  /**
   * Handles changing the quantity of the product in the cart.
   *
   * @param {number} newQuantity - The new quantity of the product.
   */
  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    updateCart(productData, newQuantity);
  };

  /**
   * Handles removing the product from the cart.
   */
  const handleCartDelete = () => {
    const updatedCartItems = cartItems.filter(item => item.product_id !== productData.id);
    setCartItems(updatedCartItems);

    // Remove from quantities state
    const updatedQuantities = { ...quantities };
    Object.keys(updatedQuantities).forEach(key => {
      if (cartItems.find(item => item.product_id === productData.id)) {
        delete updatedQuantities[key];
      }
    });
    setQuantities(updatedQuantities);

    setIsAdded(false);
  };

  /**
   * Handles navigating to the product edit page.
   */
  const handleEdit = () => {
    if (productData && vendor) {
      navigate(`/products/edit/${productData.id}`, { state: { product: productData } });
    }
  };

  /**
   * Handles deleting the product from the backend and updating the product list.
   */
  const handleDelete = () => {
    if (productData && vendor) {
      const confirmed = window.confirm('Are you sure you want to delete this product?');
      if (confirmed) {
        fetch('/api/products', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: productData.id }),
        })
          .then(response => {
            if (response.ok) {
              setAllProducts(allProducts.filter(p => p.id !== productData.id));
              navigate('/vendors', { state: { allProducts } });
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
    <article className='flex flex-col md:flex-row md:items-stretch border rounded-lg shadow-md bg-listitem bg-opacity-60 m-2 overflow-hidden'>
      {/* Image Section */}
      <div className='w-full md:w-1/3 h-36 md:h-auto'>
        <img
          src={productData.photo_url}
          alt={`${productData.name}`}
          className='w-full h-full object-cover'
        />
      </div>

      {/* Content Section */}
      <div className='p-3 w-full md:w-2/3 flex flex-col flex-grow'>
        <div className='flex flex-col flex-grow'>
          <h1 className='font-bold text-base text-left truncate'>{productData.name}</h1>
          <p className='mt-2 text-xs'>{productData.description}</p>
          <div className='flex flex-row justify-between items-end mt-auto'>
            <h3 className='text-md font-bold'>${(productData.price_cents / 100).toFixed(2)}</h3>
            {/* Button Section */}
            {isProductOwnedByUser ? (
              <div className='flex space-x-2 mt-2'>
                <button
                  onClick={handleEdit}
                  className='text-xs bg-green-600 text-white py-1 px-2 rounded'
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  onClick={handleDelete}
                  className='text-xs bg-red-500 text-white py-1 px-2 rounded'
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            ) : (
              <div className='flex items-center space-x-2 mt-2'>
                {!isAdded ? (
                  <button
                    style={{ backgroundColor: productData.vendor_id === 12 ? '#BB00BB' : '#FBBF24', color: 'black' }}
                    className="text-xs px-3 py-1 rounded hover:opacity-75"
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className='flex items-center space-x-1'>
                    <QuantityInput defaultQuantity={quantity} onChange={handleQuantityChange} />
                    <button
                      onClick={handleCartDelete}
                      className='text-xs bg-red-500 text-white py-1 px-2 rounded'
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductListItem;
