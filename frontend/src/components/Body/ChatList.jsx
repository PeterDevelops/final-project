import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import moment from 'moment'

// chat =
//   {
//     chat_id: 3,
//     last_message: '3',
//     contact_user_id: 1,
//     name: 'Peter',
//     email: 'peter@peter.com',
//     profile_photo_url: 'http://dummyimage.com/174x166.png/5fa2dd/ffffff'
//   },
//   

//consider pulling this out into a helper file???
const formatDate = (messageDateStr) => {
  const messageDate = moment.utc(messageDateStr).local(); // Convert date to local time
  // console.log("message date after local", messageDate)
  const now = moment(); // Current local date
  const yesterday = moment().subtract(1, 'days'); // Calculate yesterday's date

  console.log("messageDate", messageDate)
  console.log("now", now)
  console.log("yesterday", yesterday)

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
  const { chat, user } = props;
  const [messageData, setMessageData] = useState([]);
  const navigate = useNavigate();

  // console.log("chat", chat)
  // console.log("chat ID", chat.id)
  // console.log("MessageData state---", messageData)

  useEffect(() => {
    // if(user) {
    console.log("CHAT--------", chat.chat_id)
    axios.get(`/api/messages/last/${chat.chat_id}`)
      .then((message) => {
        setMessageData(message.data[0])
      })
      .catch((error) => { console.log("There was an issue retrieving the last message:", error) })
    // }
  }, [])

  const handleClick = (id) => {
    console.log("ChatList click event id", id)
    navigate(`/chats/${id}`, { state: { chat: chat } })
  }

  return (
    <article onClick={() => handleClick(chat.chat_id)} class="cursor-pointer flex items-center border rounded p-5 gap-4 my-5 hover:shadow-md">
      <img src={chat.contact_photo} alt="avatar"
        class="inline-block relative object-cover object-center !rounded-full w-20 h-20" />
      <div className="flex flex-col justify-between">
        <h6 class="block font-sans text-lg antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          {chat.contact_name}
        </h6>
        <p class="block font-sans text-m antialiased font-normal leading-normal text-gray-800">
          {messageData.name}: {messageData.message}
        </p>
        <p className="text-xs text-gray-500">{formatDate(messageData.created_at)}</p>
      </div>
    </article>

  )
};

export default ChatList;