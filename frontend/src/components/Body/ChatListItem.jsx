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

const ChatListItem = (props) => {
  const { user } = props;
  const { id } = useParams();
  const location = useLocation();
  const { allProducts = [], chat = {}, vendor = {}, allVendors = [] } = location.state || {};

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
      // console.log("CHATID IN CHAT", id)
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
            <div className="relative inline-flex items-center justify-center w-full" key={`divider-today-${message.id}`}>
              <hr className="w-64 h-0.5 my-8 border-0 rounded bg-[#C6BAAB]" />
              <div className="absolute px-4 bg-[#EEECE9] text-[#C6BAAB]">
                <h1 className="text-xs font-bold">Today</h1>
              </div>
            </div>
          );
        } else if (messageDate.isSame(today.subtract(1, 'day'), 'day')) {
          return (
            <div className="relative inline-flex items-center justify-center w-full" key={`divider-yesterday-${message.id}`}>
              <hr className="w-full h-0.5 my-8 border-0 rounded bg-[#C6BAAB]" />
              <div className="absolute px-4 bg-[#EEECE9] text-[#C6BAAB]">
                <h1 className="text-xs font-bold">Yesterday</h1>
              </div>
            </div>
          );
        } else if (messageDate.isBefore(yesterday)) {
          return (
            <div className="relative inline-flex items-center justify-center w-full" key={`divider-date-${message.id}`}>
              <hr className="w-64 h-0.5 my-8 border-0 rounded bg-[#C6BAAB]" />
              <div className="absolute px-4 bg-[#EEECE9] text-[#C6BAAB] transform -translate-y-1/4 top-1/2 left-5.5">
                <h1 className="text-xs font-bold">{messageDate.format('MMM DD, YYYY')}</h1>
              </div>
            </div>
          );
        }
      }

      return null; // Default case if no condition matches
    };

    return (
      <React.Fragment key={message.id}>
        {messageDivider()}
        {message.sender_id === user.id ? (
          <li className="p-3 mb-2 rounded-lg shadow-md bg-[#EDB513] max-w-max self-end">
            <p>{message.message}</p>
            <p className="text-xs text-right">{moment(message.created_at).format('LT')}</p>
          </li>
        ) : (
          <li className="p-3 mb-2 rounded-lg shadow-md bg-[#654960] text-white relative max-w-max">
            <div>
              <p>{message.message}</p>
              <p className="text-xs text-right">{moment(message.created_at).format('LT')}</p>
            </div>
          </li>
        )}
      </React.Fragment>
    );
  });


  const handleClick = () => {
    socket.emit("leave_chat", id);
    navigate(`/inbox`)
  }

  const goToVendorPage = () => {
    socket.emit("leave_chat", id);
    navigate(`/vendors/${chat.vendor_id}`, {state: {vendor: allVendors[chat.vendor_id - 1], allProducts: allProducts}})
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <div className="flex flex-col h-2/6 font-body">
        <div className="bg-[#305D53] shadow-md px-8 pt-6 pb-8 mb-4 flex-grow">
          <div className="bg-[#EEECE9] rounded p-2 relative">
            <FontAwesomeIcon icon={faCircleXmark} onClick={handleClick} className="absolute top-2 right-2 cursor-pointer" />

            <div className="bg-[#EEECE9] rounded p-2 mb-4 flex flex-row items-center cursor-pointer" onClick={goToVendorPage}>
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
                placeholder="Message..."
                onKeyDown={handleKeyDown}
              />
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
