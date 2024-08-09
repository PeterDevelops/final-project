import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import NavBar from '../NavBar';
//socket.io for the client side
import io from 'socket.io-client'
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
  // const { chat } = location.state;
  // ^^^^^ temporarily commenting this out to avoid TypeError
  // vvvvv handle case wehre location.state is null
  const chat = location.state?.chat || {};
  const navigate = useNavigate();
  const ref = useRef(null);

  // clients message
  const [message, setMessage] = useState("");
  // chat history stored in db
  const [messageHistory, setMessageHistory] = useState([]);

  // join chat on load
  useEffect(() => {
    socket.emit('join_chat', id)
  }, [])

  // scroll bar default is at the bottom
  useEffect(() => {
    ref.current?.scrollIntoView({
      behaviour: "smooth",
      block: "end",
    })

  }, [messageHistory.length])

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
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ssZZ'); //convert current local time to UTC format for db storage
    if (message.trim() !== '') {
      const newMessage = { message: message, created_at: currentDate, sender_id: user.id, user: user, chatId: id }

      //emit an event by send message to server (listening)
      socket.emit("send_message", newMessage);

      //send the message to the db and add the saved message to the messageHistory
      axios.post(`/api/messages/${id}`, { message: message, created_at: currentDate, sender_id: user.id, chatId: id })
        .then(message => {
          // console.log("messageData", message.data)
          setMessageHistory(prev => [...prev, message.data])
        })
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


  const messageList = messageHistory.map((message, index) => {
    // console.log("MESSAGE----", message.message)
    // console.log("This messages index", index)

    const messageDivider = () => {
      // Get the current message date
      const messageDate = moment(message.created_at).startOf('day');

      // Get the previous message date if it exists
      const previousMessageDate = index > 0 ? moment(messageHistory[index - 1].created_at).startOf('day') : null;

      // Get the current date, today, and the day before yesterday
      const today = moment().startOf('day');
      const yesterday = moment().subtract(1, 'days').startOf('day');

      // Check if the previous message date is different from the current message date
      if (!previousMessageDate || !messageDate.isSame(previousMessageDate, 'day')) {
        if (messageDate.isSame(today, 'day')) {
          return (
            <div className="relative inline-flex items-center justify-center w-full">
              <hr className="w-64 h-0.5 my-8 border-0 rounded bg-[#DCCFBE]" />
              <div className="absolute px-4 bg-[#F7F4F0] text-[#DCCFBE]">
                <h1 className="text-xs font-bold">Today</h1>
              </div>
            </div>)
        } else if (messageDate.isSame(today.subtract(1, 'day'), 'day')) {
          return (
            <div className="relative inline-flex items-center justify-center w-full">
              <hr className="w-full h-0.5 my-8 border-0 rounded bg-[#DCCFBE]" />
              <div className="absolute px-4 bg-[#F7F4F0] text-[#DCCFBE]">
                <h1 className="text-xs font-bold">Yesterday</h1>
              </div>
            </div>)
        } else if (messageDate.isBefore(yesterday)) {
          return (
            <div className="relative inline-flex items-center justify-center w-full">
              <hr className="w-64 h-0.5 my-8 border-0 rounded bg-[#DCCFBE]" />
              <div className="absolute px-4 bg-[#F7F4F0] text-[#DCCFBE] transform -translate-y-1/4 top-1/2 left-5.5">
                <h1 className="text-xs font-bold">{messageDate.format('MMM DD YYYY')}</h1>;
              </div>
            </div>)
        }
      }

      return null; // Default case if no condition matches
    }

    return message.sender_id === user.id ? (
      <>
            {messageDivider()}
        <li className="p-3 mb-2 rounded-lg shadow-md bg-[#EDB513] max-w-max self-end" key={message.id}>
          <p> {message.message}</p>
          <p className="text-xs text-right"> {moment(message.created_at).format('LT')}</p>
        </li>
      </>
    ) :
      (
        <>
              {messageDivider()}
          <li className="p-3 mb-2 rounded-lg shadow-md bg-[#654960] text-white relative max-w-max" key={message.id}>
            <div>
              <p> {message.message}</p>
              <p className="text-xs text-right">{moment(message.created_at).format('LT')}</p>
            </div>
          </li>
        </>
      )
  })

  const handleClick = () => {
    socket.emit("leave_chat", id);
    navigate(`/inbox`)
  }

  return (
    <>
      <div className="flex flex-col h-2/6">
        <div className="bg-[#305D53] shadow-md px-8 pt-6 pb-8 mb-4 flex-grow">
          <div className="bg-[#F7F4F0] rounded p-2 relative">
            <FontAwesomeIcon icon={faCircleXmark} onClick={handleClick} className="absolute top-2 right-2 cursor-pointer" />

            <div className="bg-[#F7F4F0] rounded p-2 mb-4 flex flex-row items-center">
              <img className="rounded-full h-16 w-16 object-cover" src={chat.contact_photo} />
              <h1 className="font-bold text-lg px-2">{chat.contact_name}</h1>
            </div>

            <div className="flex flex-col space-y-2 h-[calc(96vh-12rem)] overflow-auto">
              <ul className="flex flex-col">
                {messageList}
              </ul>
              {/* scroll bar to the bottom div */}
              <div ref={ref}>

              </div>
              {/* end */}
            </div>

          </div>

          <div className="bg-[#305D53] flex flex-row items-center rounded p-1 mt-4">
            <div className="bg-[#305D53] flex-grow">
              <textarea
                className="w-full h-12 border border-gray-300 rounded-lg p-2 resize-none overflow-auto"
                onChange={(event) => setMessage(event.target.value)}
                value={message}
                placeholder="Message..." />
            </div>
            <div className="flex-shrink ml-2" >
              <button
                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
