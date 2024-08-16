import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ChatList from '../Body/ChatList';

/**
 * Inbox component displays the list of chat conversations for the user.
 *
 * @param {Object} props - Component props
 * @param {Array} props.allProducts - Array of all products
 * @param {Array} props.allVendors - Array of all vendors
 * @param {Object} props.user - Current user object
 * @returns {JSX.Element} The rendered Inbox component
 */
const Inbox = ({ allProducts, allVendors, user }) => {
  const [chatData, setChatData] = useState([]);

  /**
   * Fetches chat data for the user and sorts it based on the last message date.
   */
  useEffect(() => {
    if (user) {
      const fetchChats = async () => {
        try {
          // Fetch user's chat data
          const { data: userChatData } = await axios.get(`/api/chats/${user.id}`);

          // Fetch the last message for each chat and attach it to the chat data
          const chatPromises = userChatData.map(chat =>
            axios.get(`/api/messages/last/${chat.chat_id}`).then(res => ({
              ...chat,
              last_message_date: res.data[0]?.created_at || null,
            }))
          );

          // Wait for all the chat promises to resolve
          const chatsWithMessages = await Promise.all(chatPromises);

          // Sort chats by the last message date (most recent first)
          const sortedChatData = chatsWithMessages.sort((a, b) => {
            const dateA = new Date(a.last_message_date);
            const dateB = new Date(b.last_message_date);
            return dateB - dateA;
          });

          // Update the state with sorted chat data
          setChatData(sortedChatData);
        } catch (error) {
          console.error('Error retrieving chat data:', error);
        }
      };

      fetchChats(); // Call the fetchChats function
    }
  }, [user]);

  /**
   * Renders the chat list based on the chat data.
   *
   * @returns {JSX.Element|null} The list of chat components or null if no chat data
   */
  const renderChatList = () => {
    if (Array.isArray(chatData) && chatData.length > 0) {
      // Render ChatList components for each chat in the chatData array
      return chatData.map(chat => (
        <ChatList
          key={chat.chat_id}
          chat={chat}
          allVendors={allVendors}
          allProducts={allProducts}
        />
      ));
    }
    return null; // Return null if there is no chat data
  };

  return (
    <div className='min-h-screen flex flex-col font-body'>
      {/* Main container for the inbox */}
      <div className='flex flex-col flex-grow px-5 pt-2 pb-8 mb-4'>
        <div className='rounded'>
          {/* Conditional rendering based on user authentication */}
          {user ? (
            renderChatList() // Render the chat list if the user is logged in
          ) : (
            <div className='flex justify-center mt-8'>
              Please{' '}
              <button className='mx-1 font-bold text-blue-700'>
                <Link to='/login'>login</Link>
              </button>{' '}
              to view your inbox.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
