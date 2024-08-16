import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import App from './App'; // Import your App component

const AppWrapper = () => {
  const location = useLocation();

  return <App
    location={location}
    Routes={Routes}
    Route={Route}
  />;
};

const Root = (props) => (
  <Router>
    <AppWrapper {...props} />
  </Router>
);

export default Root;
