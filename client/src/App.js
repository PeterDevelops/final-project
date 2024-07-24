import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [greeting, setGreeting] = useState('');

  // temp route to send request to node server
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
    <div className='bg-purple-200'>
      <header>
        <h1 className="text-6xl text-red-500 underline decoration-blue-500">{greeting}</h1>
      </header>
    </div>
  );
}

export default App;
