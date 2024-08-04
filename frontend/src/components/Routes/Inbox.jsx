import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';
import ChatList from '../Body/ChatList'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:8080")

const Inbox = ({ products, vendors, locations, categories, user, setUser}) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [chatData,setChatData] = useState([]);
  const [chat, setChat] = useState('');
 
  useEffect(() => {
    if (user) {
      axios.get(`/api/chats/${user.id}`)
        .then(response => {
          const userChatData = response.data;
          console.log("USER CHAT DATA------", userChatData)
          console.log("USER CHAT DATA LENGTH------", userChatData.length)
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
  
  console.log("CHAT DATA IN INBOX----", chatData)
      
  const chatListArr = () => {
    if (Array.isArray(chatData) && chatData.length > 0) {
      console.log("ChatData exists in the inbox")
      const chatList = chatData.map((chat) => <ChatList key={chat.id} chat={chat} user={user}/>)
      return chatList;
    }
  }

  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/>
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
