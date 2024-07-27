import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';


const Inbox = ({ products, vendors, locations, categories }) => {

  const navigate = useNavigate();

  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} />
      <button onClick={() => navigate('/')}>Go to home page</button>
    </div>
  );
};

export default Inbox;
