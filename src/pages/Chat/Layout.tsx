import ChatProvider from '../../context/app.context';
import ListMessage from './components/Chat-room/UserOnline';
import ChatComponent from './components/ChatComponent';

const LayoutChat = () => {
  return (
    <ChatProvider>
      <ChatComponent />
      <ListMessage />
    </ChatProvider>
  );
};

export default LayoutChat;
