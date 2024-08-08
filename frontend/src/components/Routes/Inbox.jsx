import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'
import NavBar from '../NavBar';
import ChatList from '../Body/ChatList'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:8080")

const Inbox = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    vendors,
    setVendors,
    allVendors,
    locations,
    categories,
    user,
    setUser,
    cartItems,
  } = props;
  const [chatData, setChatData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`/api/chats/${user.id}`)
        .then(response => {
          const userChatData = response.data;
          // console.log("USER CHAT DATA------", userChatData)
          // console.log("USER CHAT DATA LENGTH------", userChatData.length)
          setChatData(userChatData);
        })
        .catch(error => {
          console.error('Error retrieving inbox data:', error);
        });
    } else {
      console.log('Not logged in');
    }
  }, []);

  // console.log("CHAT DATA IN INBOX----", chatData)

  const chatListArr = () => {
    if (Array.isArray(chatData) && chatData.length > 0) {
      const chatList = chatData.map((chat) => <ChatList key={chat.chat_id} chat={chat} user={user} />)
      return chatList;
    }
  }

  return (
    <div>
      <NavBar
        products={products}
        setProducts={setProducts}
        allProducts={allProducts}
        vendors={vendors}
        setVendors={setVendors}
        allVendors={allVendors}
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser}
        cartItems={cartItems}
      />
      <h1 className="text-xl font-semibold m-3 p-3">Inbox </h1>

      <div className="flex flex-col justify-content">
        <div className="px-8 pt-6 pb-8 mb-4">
          <div className="rounded p-2">
            {user ? <div>{chatListArr()}</div> : <h1>Please <a onClick={() => navigate('/login')} className="cursor-pointer underline font-bold">login</a> to see your inbox.</h1>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
