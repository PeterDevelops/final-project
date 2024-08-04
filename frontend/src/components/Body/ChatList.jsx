import React from 'react';
import { useNavigate } from 'react-router-dom';

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

const ChatList = (props) => {
  const { chat, user } = props;
  const navigate = useNavigate();

  console.log("chat", chat)
  // console.log("chat ID", chat.id)

  const handleClick = (id) => {
    console.log("ChatList click event id", id)
    navigate(`/chats/${id}`, {state: {chat: chat}})

  }

  return (
      <article onClick={() => handleClick(chat.chat_id)} className="cursor-pointer bg-white flex flex-row items-center rounded border border-black p-1 my-3">
        <img src={chat.contact_photo} />
        <div className="flex flex-col p-5">
          <h1 className="font-bold text-lg">{chat.contact_name}</h1>
          <p>Last message will go here</p>
        </div>
      </article>

  )
};

export default ChatList;