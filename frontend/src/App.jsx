import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import Homepage from './components/Homepage';

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
  
  console.log("Products Data---", products)
  console.log("Vendors Data---", vendors)

  return (
  <div className="Homepage">
    <div className='bg-purple-200'>
      <header>
        {/* <h1 className="text-6xl text-red-500 underline decoration-blue-500">Mrkt</h1> */}
      </header>
      </div>
    <Homepage products={products} vendors={vendors}/>
  </div>
  );
};

export default App;
