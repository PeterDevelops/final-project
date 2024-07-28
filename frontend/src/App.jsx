import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './components/Homepage';
import Cart from './components/NavBar-Components/Cart';
import Inbox from './components/NavBar-Components/Inbox';

function App() {
  const [products, setProducts] = useState('');
  
  // a route to pull products data from the db (backend)
  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    // Router must be in the top level of the app
    <Router>
      <div className="Homepage">
        <div className='bg-purple-200'>
          <header>
            {/* <h1 className="text-6xl text-red-500 underline decoration-blue-500">Mrkt</h1> */}
          </header>
        </div>
        <Homepage products={products} />
      </div>

      {/* Path to routes */}
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/inbox" element={<Inbox />} />
        {/* <Route path="/" element={<Homepage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
