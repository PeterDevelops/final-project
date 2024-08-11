import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'


const formatDate = (messageDateStr) => {
  const messageDate = moment.utc(messageDateStr).local(); // Convert date to local time
  const now = moment(); // Current local date
  const yesterday = moment().subtract(1, 'days'); // Calculate yesterday's date

  // ChatList Format the time according to the user's local time zone
  if (now.isSame(messageDate, 'day')) {
    return messageDate.format('LT'); // Format as local time
  } else if (yesterday.isSame(messageDate, 'day')) {
    return "Yesterday"; // Return "Yesterday" if the date is yesterday
  } else {
    return messageDate.format('MMM DD YYYY'); // Format as full date
  }

};

const ChatList = (props) => {
  const { chat, user, allVendors, allProducts } = props;
  const [messageData, setMessageData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/messages/last/${chat.chat_id}`)
      .then((message) => {
        setMessageData(message.data[0])
      })
      .catch((error) => { console.log("There was an issue retrieving the last message:", error) })
  }, [])
  
  const handleClick = (id) => {
    navigate(`/chats/${id}`, { state: { chat: chat, vendor: allVendors[chat.vendor_id - 1], allProducts: allProducts, allVendors: allVendors }})
  }
  
  return (
    <article onClick={() => handleClick(chat.chat_id)} className="cursor-pointer flex items-center border rounded p-5 gap-4 my-5 bg-[#F7F4F0] bg-opacity-50 hover:shadow-md">
      <img src={chat.contact_photo} alt="avatar"
        class="inline-block relative object-cover object-center !rounded-full w-20 h-20" />
      <div className="flex flex-col justify-between">
        <h6 class="block font-sans text-lg antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          {chat.contact_name}
        </h6>
       { messageData && <> 
          <p class="block font-sans text-m antialiased font-normal leading-normal text-gray-800">
              {messageData.name}: {messageData.message}
            </p>
            <p className="text-xs text-gray-500">{formatDate(messageData.created_at)}</p>
       </>} 
      </div>
    </article>

  )
};

export default ChatList;
