import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed, faDoorOpen } from '@fortawesome/free-solid-svg-icons';

/**
 * LoginBtn is a component that displays a login or logout button based on the user's authentication state.
 *
 * @param {Object} props - The component's props.
 * @param {Object|null} props.user - The currently logged-in user, or null if not logged in.
 * @param {Function} props.setUser - Function to update the user state.
 *
 * @returns {JSX.Element} - The rendered LoginBtn component.
 */
const LoginBtn = (props) => {
  const {
    user,
    setUser
  } = props;
  const navigate = useNavigate();

  /**
   * Handles user logout by making a request to the server and clearing the user state.
   */
  const handleLogout = async () => {
    try {
      await axios.get('/logout', { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      {user ? (
        <FontAwesomeIcon
          className='text-icon hover:text-gray-900 flex items-center cursor-pointer'
          onClick={handleLogout}
          icon={faDoorOpen}
          size='2x'
          aria-label='Logout'
        />
      ) : (
        <Link to='/login'>
          <FontAwesomeIcon
            className='text-icon hover:text-gray-900 flex items-center'
            icon={faDoorClosed}
            size='2x'
            aria-label='Login'
          />
        </Link>
      )}
    </div>
  );
};

export default LoginBtn;
