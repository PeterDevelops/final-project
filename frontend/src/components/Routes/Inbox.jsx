import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ChatList from '../Body/ChatList';

const Inbox = (props) => {
  const {
    products,
    setProducts,
    allProducts,
    vendors,
    setVendors,
    allVendors,
    locations,
    categories,
    user,
    setUser,
    cartItems,
  } = props;
  const [chatData, setChatData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios.get(`/api/chats/${user.id}`)
        .then(response => {
          const userChatData = response.data;

          const chatPromises = userChatData.map(chat =>
            axios.get(`/api/messages/last/${chat.chat_id}`).then(res => ({
              ...chat,
              last_message_date: res.data[0]?.created_at || null
            }))
          );

          Promise.all(chatPromises)
            .then(chatsWithMessages => {
              const sortedChatData = chatsWithMessages.sort((a, b) => {
                const dateA = new Date(a.last_message_date);
                const dateB = new Date(b.last_message_date);
                return dateB - dateA;
              });
              setChatData(sortedChatData);
            })
            .catch(error => {
              console.error('Error retrieving last message data:', error);
            });
        })
        .catch(error => {
          console.error('Error retrieving inbox data:', error);
        });
    } else {
      console.log('Not logged in');
    }
  }, [user]);

  const chatListArr = () => {
    if (Array.isArray(chatData) && chatData.length > 0) {
      return chatData.map((chat) => (
        <ChatList key={chat.chat_id} chat={chat} user={user} allVendors={allVendors} allProducts={allProducts} />
      ));
    }
  }

  return (
    <div className='min-h-screen flex flex-col font-body'>
      <div className='flex flex-col flex-grow justify-content px-5 pt-2 pb-8 mb-4'>
        <div className='rounded'>
          {user ? (
            <div>{chatListArr()}</div>
          ) : (
            <div className='flex justify-center mt-5'>
            Please <button className='mx-1 font-bold'><Link to='/login'>Login</Link></button> to view your inbox.
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;

