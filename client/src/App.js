import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [greeting, setGreeting] = useState('');

  // we use axios to send a request to the node server
  useEffect(() => {
    axios.get('/greeting')
      .then(response => {
        setGreeting(response.data.message);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div>
      <header>
        <h1>{greeting}</h1>
      </header>
    </div>
  );
}

export default App;
