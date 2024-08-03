import React from 'react'
import { useEffect, useState } from 'react'
//socket.io for the client side
import io from 'socket.io-client'
// connect to backend socket server
const socket = io.connect("http://localhost:8080")

const ChatListItem = (props) => {
  const { chat, user } = props;
  // specific chat (1-1) [should be in inbox]
  // const [chat, setChat] = useState("")

  // clients message
  const [message, setMessage] = useState("");
  // contacts message
  const [messageReceived, setMessageReceived] = useState("");
  // const [chatHistory, setChatHistory] = useState([]);

  // runs when chat is clicked [should be in inbox]
  // const joinChat = () => {
  //   if (chat !== "") {
  //     socket.emit("join_chat", chat);
  //   }
  // }

  const sendMessage = () => {
    if (message !== '') {
      //emit an event by send message to server (listening) [add chat state to message object]
      socket.emit("send_message", { message });
      setMessage('');
    }
  }

  // runs everytime an event on the server is emitted
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data);
    })
  }, [socket])

  return (
    <div className="flex flex-col justify-content w-full max-w-xs">
      <div className="bg-[#305D53] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="bg-[#F7F4F0] rounded p-2">
          <div className="bg-[#F7F4F0] rounded px-8 pt-6 pb-8 mb-4">
            <div>
              <h1>Message: {messageReceived}</h1>
             
            </div>
          </div>
          <div className="bg-white flex flex-row items-center rounded border border-black p-1">
            <div className="bg-white flex-grow">
              <textarea
                className="bg-white focus:outline-none text-wrap"
                onChange={(event) => setMessage(event.target.value)}
                value={message}
                placeholder="Message..." />
            </div>
            <div className="flex-shrink" >
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={sendMessage}>
                Send</button>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default ChatListItem;