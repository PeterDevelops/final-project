import React from 'react';

const ChatList = (props) => {
  const { chat, user } = props;

  return (
    
      <article>
        <img src={chat.contact_photo} />
        <h1>{chat.contact_name}</h1>
        <p>Last message will go here</p>
      </article>

  )
};

export default ChatList;