import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import DeliveryToggle from '../Body/DeliveryToggle';
import CartListItem from '../Body/CartListItem';
import PaymentForm from '../Body/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51PYBRI2KSndZDZT0m4PGzx0F7CHHo0eusCyVIKccoRf8AgLH2tyXAZFN1flfXsq8D54meFVeqexQ5FZZeLwnrgKg00mRwQlpak');

/**
 * Checkout component for handling the order summary, delivery details, and payment.
 *
 * @param {Object} props - Component props
 * @param {Array} props.allProducts - List of all products
 * @param {Array} props.allVendors - List of all vendors
 * @param {Object} props.user - Current user object
 * @param {Array} props.cartItems - List of items in the cart
 * @param {Function} props.setCartItems - Function to update the cart items
 * @param {number} props.subtotal - Total cost before tax
 * @param {Object} props.quantities - Quantity of each item in the cart
 * @returns {JSX.Element} The rendered component
 */
const Checkout = (props) => {
  const {
    allProducts,
    allVendors,
    user,
    cartItems,
    setCartItems,
    subtotal,
    quantities,
  } = props;

  // State to manage delivery alignment (pickup or delivery)
  const [alignment, setAlignment] = useState('pickup');
  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    city: '',
  });

  /**
   * Handles changes to the delivery details input fields.
   *
   * @param {Object} e - Event object
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Prepare order data for submission
  const orderData = {
    user_id: user.id,
    total_cost: Math.round(subtotal * 100), // Convert subtotal to cents for Stripe
    delivery_type: alignment,
    delivery_address: alignment === 'delivery' ? deliveryDetails.address : '',
    delivery_city: alignment === 'delivery' ? deliveryDetails.city : '',
  };

  // Prepare order items for submission
  const orderItems = cartItems.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));

  // Extract unique pickup addresses from cart items
  const pickupAddresses = [...new Set(
    cartItems.map(item => {
      const product = allProducts.find(product => product.id === item.product_id);
      if (!product) return null;
      const vendor = allVendors.find(vendor => vendor.id === product.vendor_id);
      return vendor ? `${vendor.name}: ${vendor.address}, ${vendor.city}` : null;
    }).filter(Boolean)
  )];

  return (
    <div className='min-h-screen bg-main p-6'>
      {cartItems.length > 0 ? (
        <div className='max-w-4xl mx-auto bg-listitem bg-opacity-60 p-6 rounded-lg shadow-lg'>

          {/* Delivery toggle for choosing between pickup and delivery */}
          <div className='flex justify-center mb-4'>
            <DeliveryToggle
              alignment={alignment}
              setAlignment={setAlignment}
            />
          </div>

          {/* Order summary header */}
          <div className='font-bold text-xl mb-4'>Order Summary</div>

          {/* List of cart items */}
          {cartItems.map((item) => (
            <CartListItem
              key={item.cart_item_id}
              product_photo_url={item.product_photo_url}
              product_name={item.product_name}
              quantity={quantities[item.cart_item_id]}
              price_cents={item.price_cents}
            />
          ))}

          {/* Display the total amount */}
          <div className='font-bold text-right mt-4 mb-2'>
            Total: ${subtotal.toFixed(2)}
          </div>

          {/* Conditional rendering for pickup and delivery details */}
          {alignment === 'pickup' && (
            <div className='mb-4'>
              <h3 className='text-sm font-bold mb-2'>Pickup Addresses</h3>
              {pickupAddresses.length > 0 ? (
                pickupAddresses.map((address, index) => (
                  <p key={index} className='text-sm mb-1'>
                    <FontAwesomeIcon icon={faStore} className='mr-2' />
                    {address}
                  </p>
                ))
              ) : (
                <p className='text-sm'>Address and city information not available.</p>
              )}
            </div>
          )}

          {alignment === 'delivery' && (
            <div className='mb-4'>
              <h3 className='text-sm font-bold mb-2'>Delivery Details</h3>
              <div className='text-sm mb-2'>Address:</div>
              <input
                type='text'
                name='address'
                value={deliveryDetails.address}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
              <div className='text-sm mt-2 mb-2'>City:</div>
              <input
                type='text'
                name='city'
                value={deliveryDetails.city}
                onChange={handleInputChange}
                className='w-full p-2 border border-gray-300 rounded-md'
              />
            </div>
          )}

          {/* Payment form component wrapped in Stripe Elements */}
          <div className='text-sm font-bold mt-4 mb-4'>
            <div className='mb-2 mt-10'>Card Details</div>
            <Elements stripe={stripePromise}>
              <PaymentForm
                userId={user.id}
                orderData={orderData}
                orderItems={orderItems}
                setCartItems={setCartItems}
                subtotal={subtotal}
                pickupAddresses={pickupAddresses}
                alignment={alignment}
                deliveryDetails={deliveryDetails}
              />
            </Elements>
          </div>

        </div>
      ) : (
        <div className='text-center mt-6'>Add redirect logic.</div> // Placeholder for redirection if no items in the cart
      )}
    </div>
  );
};

export default Checkout;
