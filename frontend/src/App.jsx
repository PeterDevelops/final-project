import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Homepage from './components/Routes/Homepage';
import Cart from './components/Routes/Cart';
import Inbox from './components/Routes/Inbox';
import VendorList from './components/Routes/VendorList';
import ProductList from './components/Routes/ProductList';
import CategoryList from './components/Routes/CategoryList';

function App() {
  const [products, setProducts] = useState('');
  const [vendors, setVendors] = useState('');

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

  // a route to pull vendors data from the db (backend)
  useEffect(() => {
    axios.get('/api/vendors')
      .then(response => {
        setVendors(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  // console.log("Products Data---", products)
  // console.log("Vendors Data---", vendors)

  return (
    // Router must be in the top level of the app
    <Router>
      <div className="Homepage">
        <div className='bg-purple-200'>
          <header>
            {/* <h1 className="text-6xl text-red-500 underline decoration-blue-500">Mrkt</h1> */}
          </header>
        </div>
        {/* <Homepage products={products} /> */}
      </div>

      {/* Path to routes */}
      <Routes>
        <Route path="/" element={<Homepage products={products} vendors={vendors} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/inbox" element={<Inbox />} />
        <Route path="/vendors" element={<VendorList vendors={vendors} products={products} />} />
        <Route path="/products" element={<ProductList vendors={vendors} products={products} />}/>
        <Route path="/categories" element={<CategoryList />}/>

      </Routes>

    </Router>
    // <Homepage products={products} vendors={vendors}/>

  );
};

export default App;
