import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Cart.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import DeliveryToggle from '../Body/DeliveryToggle';
import CartListItem from '../Body/CartListItem';
import PaymentForm from '../Body/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PYBRI2KSndZDZT0m4PGzx0F7CHHo0eusCyVIKccoRf8AgLH2tyXAZFN1flfXsq8D54meFVeqexQ5FZZeLwnrgKg00mRwQlpak');

const Checkout = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    vendors,
    setVendors,
    allVendors,
    locations,
    user,
    setUser,
    cartItems,
    totalCost,
    setCartItems,
    subtotal,
    quantities,
  } = props;

  const navigate = useNavigate();
  const [alignment, setAlignment] = useState('pickup');

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    city: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const orderData = {
    user_id: user.id,
    total_cost: Math.round(subtotal * 100),
    delivery_type: alignment,
    delivery_address: alignment === 'delivery' ? deliveryDetails.address : '',
    delivery_city: alignment === 'delivery' ? deliveryDetails.city : '',
  };

  const orderItems = cartItems.map((item) => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));

  // Get unique vendor pickup addresses
  const pickupAddresses = [...new Set(
    cartItems.map(item => {
      const product = allProducts.find(product => product.id === item.product_id);
      if (!product) return null;
      const vendor = allVendors.find(vendor => vendor.id === product.vendor_id);
      return vendor ? `${vendor.name}: ${vendor.address}, ${vendor.city}` : null;
    }).filter(Boolean)
  )];

  return (
    <div className="min-h-screen">
      {cartItems.length > 0 ? (
        <div className="cart-container">
          <div className="cart-center">
            <DeliveryToggle alignment={alignment} setAlignment={setAlignment} />
          </div>

          <div className="font-bold text-xl">Order Summary</div>

          {cartItems.map((item) => (
            <CartListItem
              key={item.cart_item_id}
              product_photo_url={item.product_photo_url}
              product_name={item.product_name}
              quantity={quantities[item.cart_item_id]}
              price_cents={item.price_cents}
            />
          ))}

          <div className="font-bold text-right m-2 mr-4">
            Total: ${subtotal.toFixed(2)}
          </div>

          {alignment === 'pickup' && (
            <div>
              <h3 className="text-sm font-bold">Pickup Addresses</h3>
              {pickupAddresses.length > 0 ? (
                pickupAddresses.map((address, index) => (
                  <p key={index} className="text-sm mb-1"><FontAwesomeIcon icon={faStore} className="mr-2" />{address}</p>
                ))
              ) : (
                <p>Address and city information not available.</p>
              )}
            </div>
          )}

          {alignment === 'delivery' && (
            <div>
              <h3 className="text-sm font-bold">Delivery Details</h3>
              <div className="text-sm">Address:</div>
              <div>
                <input
                  type="text"
                  name="address"
                  value={deliveryDetails.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-sm">City:</div>
              <div>
                <input
                  type="text"
                  name="city"
                  value={deliveryDetails.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          <div className="text-sm font-bold mt-2">
            <div className="mb-1">Card Details</div>
            <Elements stripe={stripePromise}>
              <PaymentForm
                userId={user.id}
                totalCost={totalCost}
                orderData={orderData}
                orderItems={orderItems}
                setCartItems={setCartItems}
                subtotal={subtotal}
                pickupAddresses={pickupAddresses}
              />
            </Elements>
          </div>

          <div
            className="flex justify-center text-white bg-blue-700 font-medium rounded-lg text-large px-5 py-2.5
          me-2 mb-2 dark:bg-blue-600"
          >
            <button onClick={() => navigate('/')}>Continue Shopping</button>
          </div>

        </div>
      ) : (
        <div>Add redirect logic.</div>
      )}
    </div>
  );
};

export default Checkout;
