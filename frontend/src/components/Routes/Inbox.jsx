import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
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
    locations,
    categories,
    user,
    setUser
  } = props;
  const [username, setUsername] = useState("");
  const [chatData, setChatData] = useState([]);
  // const [chat, setChat] = useState('');

  useEffect(() => {
    if (user) {
      axios.get(`/api/chats/${user.id}`)
        .then(response => {
          const userChatData = response.data;
          // console.log("USER CHAT DATA------", userChatData)
          // console.log("USER CHAT DATA LENGTH------", userChatData.length)
          setChatData(userChatData);
          setUsername(user.name);
        })
        .catch(error => {
          console.error('Error retrieving inbox data:', error);
        });
    } else {
      console.log('Not logged in');
    }
  }, [user]);


  // const joinChat = (chatId) => {
  // console.log("Chat clicked");
  // if (username !== "" && chat !== "") {
  //   socket.emit("join_chat", {chatId})
  // }
  // }

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
        locations={locations}
        categories={categories}
        user={user}
        setUser={setUser} 
      />
      <h1 className="text-xl font-semibold m-3 p-3">Inbox </h1>

      <div className="flex flex-col justify-content">
        <div className="bg-[#F7F4F0] shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="bg-[#F7F4F0] rounded p-2">
            {chatListArr()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
