import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//socket.io for the client side
import io from 'socket.io-client'
import NavBar from '../NavBar';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
// connect to backend socket server
const socket = io.connect("http://localhost:8080")

// chatHistory = [... {}, 
//   {
//     id: 12,
//     message: 'Good for you.',
//     created_at: 2024-08-18T19:29:45.000Z,
//     sender_id: 4,
//     chat_id: 3
//   }
// ]

const ChatListItem = (props) => {
  const { user } = props;
  const { id } = useParams();
  const location = useLocation();
  const { chat } = location.state;
  const navigate = useNavigate();

  // clients message
  const [message, setMessage] = useState("");
  // chat history stored in db
  const [messageHistory, setMessageHistory] = useState([]);

  // join chat on load
  useEffect(() => {
    socket.emit('join_chat', id)  
  }, [])

  // load this chat's messages
  useEffect(() => {
    if (id) {
      socket.emit('join_chat', id);

      axios.get(`/api/messages/${id}`)
        .then(response => {
          // console.log("messages data----", response.data)
          setMessageHistory(response.data)
        })
        .catch((error) => { console.error("Issue gathering message data:", error) })
    }
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { message: message, created_at: moment().toISOString(), sender_id: user.id, user: user, chatId: id }
      //emit an event by send message to server (listening) [add chat state to message object]
      socket.emit("send_message", newMessage);
      setMessageHistory(prev => [...prev, newMessage])
      setMessage('');
    }
  }

  // runs everytime an event on the server is emitted
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageHistory(prev => [...prev, data]);
    };

    socket.on("receive_message", handleReceiveMessage);

    // Cleanup listener on component unmount
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket]);


  const messageList = messageHistory.map((message) => {
    return message.sender_id === user.id ? (
      <li className="p-3 mb-2 rounded-lg shadow-md bg-[#EDB513] max-w-max self-end" key={message.id}>
        <p> {message.message}</p>
        <p className="text-xs text-right"> {moment(message.created_at).format('MMM D, YYYY h:mm A')}: </p>
      </li>
    ) :
      (
        <li className="p-3 mb-2 rounded-lg shadow-md bg-[#654960] text-white relative max-w-max" key={message.id}>
          <div>
            <p> {message.message}</p>
            <p className="text-xs text-right"> {moment(message.created_at).format('MMM D, YYYY h:mm A')}: </p>
          </div>
        </li>
      )
  })

  const handleClick = () => {
    socket.emit("leave_chat", id);
    navigate(`/inbox`)
  }

  return (
    <>
      {/* <NavBar products={products} vendors={vendors} locations={locations} categories={categories} user={user} setUser={setUser}/> */}
      <div className="flex flex-col h-screen">
        <div className="bg-[#305D53] shadow-md rounded px-8 pt-6 pb-8 mb-4 flex-grow">
          <div className="bg-[#F7F4F0] rounded p-2 relative">
            <FontAwesomeIcon icon={faCircleXmark} onClick={handleClick} className="absolute top-2 right-2 cursor-pointer" />

            <div className="bg-[#F7F4F0] rounded p-2 mb-4 flex flex-row items-center">
              <img className="rounded-full h-16 w-16 object-cover" src={chat.contact_photo} />
              <h1 className="font-bold text-lg px-2">{chat.contact_name}</h1>
            </div>

            <div className="flex flex-col space-y-2 h-[calc(92vh-12rem)] overflow-auto">
              <ul className="flex flex-col">
                {messageList}
              </ul>
            </div>

          </div>

          <div className="bg-white flex flex-row items-center rounded border border-black p-1 mt-4">
            <div className="bg-white flex-grow">
              <textarea
                className="w-full h-16 border border-gray-300 rounded-lg p-2 resize-none"
                onChange={(event) => setMessage(event.target.value)}
                value={message}
                placeholder="Message..." />
            </div>
            <div className="flex-shrink ml-2" >
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={sendMessage}>
                Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatListItem;