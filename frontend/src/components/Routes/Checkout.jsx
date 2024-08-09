import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import '../../styles/Cart.scss';
import DeliveryToggle from '../Body/DeliveryToggle';
import CartListItem from '../Body/CartListItem';
import PaymentForm from '../Body/PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
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
    quantities
  } = props;
  // console.log('totalCost:Checkout:', totalCost);
  // console.log('cartItems:', cartItems);

  // const userId = 1;

  const navigate = useNavigate();

  const [alignment, setAlignment] = useState('pickup');

  const [deliveryDetails, setDeliveryDetails] = useState({
    address: '',
    city: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const orderData = {
    user_id: user.id,
    total_cost: Math.round(subtotal * 100),
    delivery_type: alignment,
    delivery_address: alignment === 'delivery' ? deliveryDetails.address : '',
    delivery_city: alignment === 'delivery' ? deliveryDetails.city : ''
  };

  const orderItems = cartItems.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity
  }));

  return (
    <div className="relative h-screen">
    {/* //   <NavBar
    //     products={products}
    //     setProducts={setProducts}
    //     allProducts={allProducts}
    //     vendors={vendors}
    //     setVendors={setVendors}
    //     allVendors={allVendors}
    //     locations={locations}
    //     user={user}
    //     setUser={setUser}
    //     cartItems={cartItems}
    //   /> */}

      {cartItems.length > 0 ? (

        <div className='cart-container'>

          <div className='cart-center'>
            <DeliveryToggle
              alignment={alignment}
              setAlignment={setAlignment}
            />
          </div>

          <div className='font-bold text-xl'>
            Order Summary
          </div>

          {cartItems.map(item => (
            <CartListItem
              key={item.cart_item_id}
              product_photo_url={item.product_photo_url}
              product_name={item.product_name}
              quantity={quantities[item.cart_item_id]}
              price_cents={item.price_cents}
            />
          ))}

          <div className='total m-2'>
            Total: ${subtotal.toFixed(2)}
          </div>

          {/* if pickup render vendor address and city */}
          {alignment === 'pickup' && (
            <div>
              <h3>Pickup Address</h3>
              {cartItems.length > 0 ? (
                <p>{cartItems[0].vendor_address}, {cartItems[0].vendor_city}</p>
              ) : (
                <p>Address and city information not available.</p>
              )}
            </div>
          )}

          {/* if delivery render form */}
          {alignment === 'delivery' && (
            <div>

              <h3>Delivery Details</h3>
              <div>
                <label>
                  Address:
                  <input
                    type='text'
                    name='address'
                    value={deliveryDetails.address}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

              <div>
                <label>
                  City:
                  <input
                    type='text'
                    name='city'
                    value={deliveryDetails.city}
                    onChange={handleInputChange}
                  />
                </label>
              </div>

            </div>

          )}

          <Elements stripe={stripePromise}>
            <PaymentForm
              userId={user.id}
              totalCost={totalCost}
              orderData={orderData}
              orderItems={orderItems}
              setCartItems={setCartItems}
              subtotal={subtotal}
              />
          </Elements>


          <div className='cart-center'>
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
