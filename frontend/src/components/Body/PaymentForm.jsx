import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/PaymentForm.scss';
import '../../styles/Cart.scss';

const PaymentForm = ({ userId, totalCost, orderData, orderItems, setCartItems }) => {

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  const cardStyle = {
    style: {
      base: {
        fontSize: '16px',
        color: '#32325d',
        '::placeholder': {
          color: '#a0aec0',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };



  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      // create a PaymentIntent on the server
      const response = await axios.post('api/stripe/create-payment-intent', {
        amount: totalCost,
        userId: userId
      });

      const { clientSecret } = response.data;

      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: userId
          },
        },
      });

      if (confirmError) {
        setError(confirmError.message);
        return;
      }

      // payment successful, create the order
      await axios.post('api/orders', { orderData, orderItems });

      // delete the cart and cart items
      await axios.delete(`/api/cart/${userId}`);

      // clear cartItems state
      setCartItems([]);

      // redirect to order confirmation page
      navigate('/order-confirmation');
    }
    catch (error) {
      setError('Payment failed');
      console.error('Error:', error);
    }

  }


  return(
    <form onSubmit={handleSubmit}>
    <div className='card-element-wrapper'>
    <CardElement options={cardStyle} />
    </div>
    <div className='cart-center'>
    <button className='text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-300
        font-medium rounded-full text-sm px-5 py-2 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
        dark:focus:ring-green-800' type='submit' disabled={!stripe}>
      Pay
    </button>
    </div>
    {error && <div>{error}</div>}
  </form>
  )
};

export default PaymentForm;
