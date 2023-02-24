import ChatProvider from '../../context/app.context';
import ChatComponent from './ChatComponent';
import UserOnline from './UserOnline';

const LayoutChat = () => {
  return (
    <ChatProvider>
      <ChatComponent />
      <UserOnline />
    </ChatProvider>
  );
};

export default LayoutChat;
