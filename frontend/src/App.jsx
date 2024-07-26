import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

import Homepage from './components/Homepage';

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
  <div className="Homepage">
    <div className='bg-purple-200'>
      <header>
        <h1 className="text-6xl text-red-500 underline decoration-blue-500">Mrkt</h1>
      </header>
      </div>
    <Homepage products={products}/>
  </div>
  );
};

export default App;
