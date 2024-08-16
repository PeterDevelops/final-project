import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ChatList from '../Body/ChatList';

const Inbox = ({ allProducts, allVendors, user }) => {
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchChats = async () => {
        try {
          const { data: userChatData } = await axios.get(`/api/chats/${user.id}`);

          const chatPromises = userChatData.map(chat =>
            axios.get(`/api/messages/last/${chat.chat_id}`).then(res => ({
              ...chat,
              last_message_date: res.data[0]?.created_at || null
            }))
          );

          const chatsWithMessages = await Promise.all(chatPromises);
          const sortedChatData = chatsWithMessages.sort((a, b) => {
            const dateA = new Date(a.last_message_date);
            const dateB = new Date(b.last_message_date);
            return dateB - dateA;
          });

          setChatData(sortedChatData);
        } catch (error) {
          console.error('Error retrieving chat data:', error);
        }
      };

      fetchChats();
    }
  }, [user]);

  const renderChatList = () => {
    if (Array.isArray(chatData) && chatData.length > 0) {
      return chatData.map(chat => (
        <ChatList
          key={chat.chat_id}
          chat={chat}
          allVendors={allVendors}
          allProducts={allProducts}
        />
      ));
    }
    return null;
  };

  return (
    <div className='min-h-screen flex flex-col font-body'>
      <div className='flex flex-col flex-grow px-5 pt-2 pb-8 mb-4'>
        <div className='rounded'>
          {user ? (
            renderChatList()
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
