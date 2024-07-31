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
import Checkout from './components/Routes/Checkout'
import Login from './components/Routes/Login'
import Checkout from './components/Routes/Checkout';
import LocationList from './components/Routes/LocationList';

function App() {
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  // a route to pull products data from the db (backend)
  useEffect(() => {
    axios.get('/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error with products data!', error);
      });
  }, []);

  // a route to pull vendors data from the db (backend)
  useEffect(() => {
    axios.get('/api/vendors')
      .then(response => {
        setVendors(response.data);
      })
      .catch(error => {
        console.error('There was an error with vendor data!', error);
      });
  }, []);

  // a route to pull location data from the db (backend)
  useEffect(() => {
    axios.get('/api/locations')
      .then(response => {
        setLocations(response.data);
      })
      .catch(error => {
        console.error('There was an error with locations data!', error);
      });
  }, []);

  // a route to pull all category data from the db (backend)
  useEffect(() => {
    axios.get('/api/categories')
    .then(response => {
      setCategories(response.data);
    })
    .catch(error => {
      console.error('There was an error with category data!', error);
    });
}, []);

  // console.log("Products Data---", products)
  // console.log("Vendors Data---", vendors)
  // console.log("categories data: ------- ", categories)

  return (
    // Router must be in the top level of the app
    <Router>
      <div className="Homepage"></div>

      {/* Path to routes */}
      <Routes>
        <Route path="/" element={<Homepage products={products} vendors={vendors} locations={locations} />} />
        <Route path="/cart" element={<Cart products={products} vendors={vendors} locations={locations} />} />
        <Route path="/inbox" element={<Inbox products={products} vendors={vendors} locations={locations} />} />
        <Route path="/vendors" element={<VendorList products={products} vendors={vendors} locations={locations} />} />
        <Route path="/products" element={<ProductList products={products} vendors={vendors} locations={locations} />} />
        <Route path="/categories" element={<CategoryList products={products} vendors={vendors} locations={locations} />} />
        <Route path="/checkout" element={<Checkout products={products} vendors={vendors} locations={locations} />} />
      </Routes>

    </Router>

  );
};

export default App;
