import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const Cart = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // '/cart'
  console.log(location.pathname);

  return (
    <div className="flex items-center">
      {/* <a href="#" className="text-gray-700 hover:text-gray-900">
        <FontAwesomeIcon icon={faCartShopping} size="2x" />
      </a> */}
      <button onClick={() => navigate('/')}>Go to home page</button>
    </div>
  );
};

export default Cart;
