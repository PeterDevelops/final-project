import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';


const Inbox = () => {

  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/')}>Go to home page</button>
    </div>
  );
};

export default Inbox;
