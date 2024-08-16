import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

/**
 * Formats a given message date string into a human-readable format.
 *
 * @param {string} messageDateStr - The date string of the message.
 * @returns {string} The formatted date string.
 */
const formatDate = (messageDateStr) => {
  const messageDate = moment.utc(messageDateStr).local(); // Convert date to local time
  const now = moment(); // Current local date
  const yesterday = moment().subtract(1, 'days'); // Calculate yesterday's date

  if (now.isSame(messageDate, 'day')) {
    return messageDate.format('LT'); // Format as local time
  } else if (yesterday.isSame(messageDate, 'day')) {
    return 'Yesterday'; // Return 'Yesterday' if the date is yesterday
  } else {
    return messageDate.format('MMM DD, YYYY'); // Format as full date
  }
};

/**
 * ChatList component displays a list of chat items with the latest message and contact information.
 *
 * @param {Object} props - The component's props.
 * @param {Object} props.chat - The chat object containing chat details.
 * @param {Array} props.allVendors - The list of all vendors.
 * @param {Array} props.allProducts - The list of all products.
 *
 * @returns {JSX.Element} The rendered ChatList component.
 */
const ChatList = (props) => {
  const {
    chat,
    allVendors,
    allProducts
  } = props;

  // State to store the last message data
  const [messageData, setMessageData] = useState([]);

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Fetch the last message data when the chat ID changes
  useEffect(() => {
    axios.get(`/api/messages/last/${chat.chat_id}`)
      .then(response => {
        setMessageData(response.data[0]);
      })
      .catch(error => {
        console.error('There was an issue retrieving the last message:', error);
      });
  }, [chat.chat_id]);

  /**
   * Handles click events to navigate to the detailed chat view.
   *
   * @param {number} id - The ID of the chat to navigate to.
   */
  const handleClick = (id) => {
    navigate(`/chats/${id}`, {
      state: {
        chat: chat,
        vendor: allVendors[chat.vendor_id - 1],
        allProducts: allProducts,
        allVendors: allVendors
      }
    });
  };

  return (
    <article
      onClick={() => handleClick(chat.chat_id)}
      className='cursor-pointer flex items-center border border-[#C6BAAB] rounded p-3 gap-4 my-4 bg-[#EEECE9] bg-opacity-70 hover:shadow-md font-body'
    >
      <div className='relative w-20 h-20'>
        <img
          src={chat.contact_photo}
          alt='avatar'
          className='object-cover object-center rounded-full w-full h-full'
          style={{ imageRendering: 'auto' }}
        />
      </div>
      <div className='flex flex-col justify-between'>
        <h6 className='block font-body text-sm antialiased font-bold leading-relaxed tracking-normal text-inherit'>
          {chat.contact_name}
        </h6>
        {messageData && (
          <>
            <p className='block font-sans text-sm antialiased font-normal leading-normal text-gray-800'>
              {messageData.name}: {messageData.message}
            </p>
            <p className='text-xs text-gray-500'>
              {formatDate(messageData.created_at)}
            </p>
          </>
        )}
      </div>
    </article>
  );
};

export default ChatList;

