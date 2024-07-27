import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const HamburgerMenu = () => {
  return (
    <div className="flex items-center">
      <a href="#" className="text-gray-700 hover:text-gray-900">
        <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6" />
      </a>
    </div>
  );
};

export default HamburgerMenu;
