import { getCurrentChat } from '../../../api/Chat/chat';
import { useChat } from '../../../context/app.context';
import { getUserLocal } from '../../../helper';

const useUserOnline = () => {
  const { setMessages, setRoomId, setReceive } = useChat();

  const handleGetCurrentChat = async (id: string) => {
    const { _id: userId } = getUserLocal();
    const { data } = await getCurrentChat(id);
    const receiveId = data.users.find((item) => item != userId);
    setRoomId(data?._id);
    setMessages(data?.messages);
    setReceive(receiveId);
  };
  return { handleGetCurrentChat };
};

export default useUserOnline;
