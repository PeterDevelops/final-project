import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/useNavBar.scss';

const UseNavBar = ({ children }) => {
  const location = useLocation();
  const noNavBarPaths = ['/chats'];

  const showNavBar = !noNavBarPaths.some(path => location.pathname.startsWith(path));

  // console.log("location, pathname: ------ ", location.pathname);

  return (
    <div className={showNavBar ? 'with-navbar' : 'without-navbar'}>
    {showNavBar && <NavBar />}
    {children}
  </div>
  );
};

export default UseNavBar;
