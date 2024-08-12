import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

const LoginBtn = (props) => {
  const { user, setUser } = props

  const navigate = useNavigate();

  const handleClick = async () => {
    //await the GET /logout request and send the cookie info along with the request (withCredentials)
    await axios.get("/logout", {withCredentials: true})
    setUser(null);
    navigate('/')
  }

  return (
    <div>
      {user && <FontAwesomeIcon className="text-gray-700 hover:text-gray-900 flex items-center" onClick={handleClick} icon={faDoorOpen} size="lg" />}
      {!user && <Link to="/login"><FontAwesomeIcon className="text-gray-700 hover:text-gray-900 flex items-center" icon={faDoorClosed} size="lg" /></Link>}
    </div>
  )
};

export default LoginBtn