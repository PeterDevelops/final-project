import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import NavBar from '../NavBar';
// socket.io for the client side
import io from 'socket.io-client';

// Connect to backend socket server
const socket = io();

/**
 * ChatListItem component displays a chat interface allowing users to send and receive messages.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.user - The current user object.
 *
 * @returns {JSX.Element} The rendered ChatListItem component.
 */
const ChatListItem = (props) => {
  const { user } = props;
  const { id } = useParams(); // Get chat ID from URL parameters
  const location = useLocation();
  const { allProducts = [], chat = {}, vendor = {}, allVendors = [] } = location.state || {};

  const navigate = useNavigate();
  const ref = useRef(null); // Reference for scrolling to the bottom

  // Client's message
  const [message, setMessage] = useState('');
  // Chat history stored in db
  const [messageHistory, setMessageHistory] = useState([]);

  // Join the chat when the component mounts
  useEffect(() => {
    socket.emit('join_chat', id);
  }, [id]);

  // Scroll to the bottom when message history updates
  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messageHistory.length]);

  // Load chat messages from the server when chat ID changes
  useEffect(() => {
    if (id) {
      axios.get(`/api/messages/${id}`)
        .then(response => setMessageHistory(response.data))
        .catch(error => console.error('Issue gathering message data:', error));
    }
  }, [id]);


  // Sends a message to the server and updates the chat history.
  const sendMessage = () => {
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ssZZ'); // Convert current local time to UTC format for DB storage
    if (message.trim() !== '') {
      const newMessage = { message, created_at: currentDate, sender_id: user.id, user, chatId: id };

      // Emit event to send message to server
      socket.emit('send_message', newMessage);

      // Save message to the database and update message history
      axios.post(`/api/messages/${id}`, newMessage)
        .then(response => setMessageHistory(prev => [...prev, response.data]))
        .catch(error => console.error('Issue sending message:', error));

      setMessage('');
    }
  };

  // Handle incoming messages from the server
  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageHistory(prev => [...prev, data]);
    };

    socket.on('receive_message', handleReceiveMessage);

    // Cleanup listener on component unmount
    return () => {
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [socket]);

  /**
   * Renders message dividers based on message dates.
   *
   * @param {Object} message - The message object to check.
   * @param {number} index - The index of the message in the history.
   * @returns {JSX.Element|null} The rendered divider or null.
   */
  const messageDivider = (message, index) => {
    const messageDate = moment(message.created_at).startOf('day');
    const previousMessageDate = index > 0 ? moment(messageHistory[index - 1].created_at).startOf('day') : null;

    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');

    if (!previousMessageDate || !messageDate.isSame(previousMessageDate, 'day')) {
      if (messageDate.isSame(today, 'day')) {
        return (
          <div className='relative inline-flex items-center justify-center w-full' key={`divider-today-${message.id}`}>
            <hr className='w-64 h-0.5 my-8 border-0 rounded bg-[#C6BAAB]' />
            <div className='absolute px-4 bg-[#EEECE9] text-[#C6BAAB]'>
              <h1 className='text-xs font-bold'>Today</h1>
            </div>
          </div>
        );
      } else if (messageDate.isSame(today.subtract(1, 'day'), 'day')) {
        return (
          <div className='relative inline-flex items-center justify-center w-full' key={`divider-yesterday-${message.id}`}>
            <hr className='w-full h-0.5 my-8 border-0 rounded bg-[#C6BAAB]' />
            <div className='absolute px-4 bg-[#EEECE9] text-[#C6BAAB]'>
              <h1 className='text-xs font-bold'>Yesterday</h1>
            </div>
          </div>
        );
      } else if (messageDate.isBefore(yesterday)) {
        return (
          <div className='relative inline-flex items-center justify-center w-full' key={`divider-date-${message.id}`}>
            <hr className='w-64 h-0.5 my-8 border-0 rounded bg-[#C6BAAB]' />
            <div className='absolute px-4 bg-[#EEECE9] text-[#C6BAAB] transform -translate-y-1/4 top-1/2 left-5.5'>
              <h1 className='text-xs font-bold'>{messageDate.format('MMM DD, YYYY')}</h1>
            </div>
          </div>
        );
      }
    }

    return null; // Default case if no condition matches
  };

  const messageList = messageHistory.map((message, index) => (
    <React.Fragment key={message.id}>
      {messageDivider(message, index)}
      {message.sender_id === user.id ? (
        <li className='p-3 mb-2 rounded-lg shadow-md bg-yellow-500 max-w-max self-end'>
          <p>{message.message}</p>
          <p className='text-xs text-right'>{moment(message.created_at).format('LT')}</p>
        </li>
      ) : (
        <li className='p-3 mb-2 rounded-lg shadow-md bg-border text-white relative max-w-max'>
          <div>
            <p>{message.message}</p>
            <p className='text-xs text-right'>{moment(message.created_at).format('LT')}</p>
          </div>
        </li>
      )}
    </React.Fragment>
  ));

  /**
   * Handles clicking to leave the chat and navigate to the inbox.
   */
  const handleClick = () => {
    socket.emit('leave_chat', id);
    navigate('/inbox');
  };

  /**
   * Handles clicking to navigate to the vendor page.
   */
  const goToVendorPage = () => {
    socket.emit('leave_chat', id);
    navigate(`/vendors/${chat.vendor_id}`, { state: { vendor: allVendors[chat.vendor_id - 1], allProducts } });
  };

  /**
   * Handles the 'Enter' key press to send a message.
   *
   * @param {KeyboardEvent} event - The keyboard event.
   */
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className='flex flex-col min-h-screen font-body'>
      <div className='bg-navbar shadow-md px-8 pt-8 pb-4 flex flex-col flex-grow'>
        <div className='chatbox bg-[#EEECE9] flex flex-col flex-1 rounded-lg p-2'>
          <FontAwesomeIcon
            icon={faCircleXmark}
            onClick={handleClick}
            className='absolute top-2 right-2 cursor-pointer'
          />

          <div
            className='bg-[#EEECE9] rounded p-2 mb-4 flex flex-row items-center cursor-pointer'
            onClick={goToVendorPage}
          >
            <img
              className='rounded-full h-16 w-16 object-cover'
              src={chat.contact_photo}
              alt='Contact'
            />
            <h1 className='font-bold text-lg px-2'>{chat.contact_name}</h1>
          </div>

          <div className='border-b-4 border-[#C6BAAB] w-auto'></div>

          <div className='flex flex-col flex-1 overflow-y-auto'>
            <ul className='flex flex-col'>
              {messageList}
            </ul>
            <div ref={ref} /> {/* Scroll to the bottom div */}
          </div>
        </div>

        <div className='bg-navbar flex flex-row items-center justify-between rounded'>
          <div className='bg-navbar flex-grow'>
            <textarea
              className='w-full h-20 border border-gray-300 rounded-lg p-2 resize-none overflow-auto mt-6'
              onChange={(event) => setMessage(event.target.value)}
              value={message}
              placeholder='Message...'
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className='flex-shrink ml-2'>
            <button
              className='border-2 border-green-900 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 mt-5'
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
