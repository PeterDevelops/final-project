import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';


const Inbox = ({ products, setProducts, allProducts, vendors, locations, categories, user, setUser }) => {

  const navigate = useNavigate();

  return (
    <div>
      <NavBar products={products} setProducts={setProducts} allProducts={allProducts} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/>
      <button onClick={() => navigate('/')}>Go to home page</button>
    </div>
  );
};

export default Inbox;
