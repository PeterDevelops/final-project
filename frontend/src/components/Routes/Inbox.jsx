import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import ChatList from '../Body/ChatList'


const Inbox = ({ products, vendors, locations, categories, user, setUser }) => {

  const navigate = useNavigate();

  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/>
      <ChatList user={user}/>
    </div>
  );
};

export default Inbox;
