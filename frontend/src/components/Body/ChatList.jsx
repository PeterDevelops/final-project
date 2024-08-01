import ChatListItem from './ChatListItem'

const ChatList = (props) => {
  const { user } = props;
  return (
    <div className="flex flex-row justify-center m-5">
      <ChatListItem user={user}/>
    </div>

  )
}

export default ChatList;