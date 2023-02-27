import { getCurrentChat } from '../../../api/Chat/chat';
import { useChat } from '../../../context/app.context';
import { getUserLocal } from '../../../helper';

const useUserOnline = () => {
  const { setMessages, setRoomId, setReceive, setSelectedUser } = useChat();
  const handleGetCurrentChat = async (id: string) => {
    const { _id: userId } = getUserLocal();
    const { data } = await getCurrentChat(id);
    const receiveId = data.users.find((item) => item != userId);
    setSelectedUser(receiveId);
    setRoomId(data?._id);
    localStorage.setItem('roomId', data?._id);
    setMessages(data?.messages);
    setReceive(receiveId);
  };
  return { handleGetCurrentChat };
};

export default useUserOnline;
