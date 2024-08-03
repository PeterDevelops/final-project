import React from 'react';
import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../NavBar';
import ChatList from '../Body/ChatList'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:8080")

const Inbox = ({ products, vendors, locations, categories, user, setUser}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { inboxData } = location.state;

  const [username, setUsername] = useState("");
  const [chat, setChat] = useState('');

  // console.log("INBOX DATA----", inboxData)


  useEffect(() => {
    if (user) {
      // console.log("user-----", user)
      setUsername(user.name)
    }
  }, [])


  // const joinChat = (chatId) => {
    // console.log("Chat clicked");
    // if (username !== "" && chat !== "") {
    //   socket.emit("join_chat", {chatId})

    // }
  // }

  const chatListArr = () => {
    if (Array.isArray(inboxData) && inboxData.length > 0) {
      const chatList = inboxData.map((chat) => <ChatList key={chat.id} chat={chat} user={user}/>)
      return chatList;
    }
  }

  return (
    <div>
      <NavBar products={products} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/>
      <h1 className="text-xl font-semibold m-3 p-3">Inbox </h1>
      {chatListArr()}
    </div>
  );
};

export default Inbox;
