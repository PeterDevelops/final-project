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
      .catch((error) => {console.log("There was an issue retrieving the last message:", error)})
    // }
  }, [])

  const handleClick = (id) => {
    console.log("ChatList click event id", id)
    navigate(`/chats/${id}`, {state: {chat: chat}})
  }

  return (
      <article onClick={() => handleClick(chat.chat_id)} className="cursor-pointer flex flex-row items-center rounded my-3">
        <img src={chat.contact_photo} className="rounded-full h-16 w-16 object-cover"/>
        <div className="flex flex-col p-5 w-full">
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-lg">{chat.contact_name}</h1>
            <p className="text-xs">{formatDate(messageData.created_at)}</p>
          </div>
          <p>{messageData.name}: {messageData.message}</p>
        </div>
      </article>

  )
};

export default ChatList;