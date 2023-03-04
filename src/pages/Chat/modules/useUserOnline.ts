import { useSelector } from 'react-redux';

import { getCurrentChat, getRoom } from '../../../api/Chat/chat';
import { useChat } from '../../../context/app.context';
import { getUserLocal } from '../../../helper';
import { RootState } from '../../../stores/store';
import { getUser } from './../../../api/Users/user.api';

const useUserOnline = () => {
  const {
    setMessages,
    setRoomId,
    setReceive,
    setSelectedUser,
    setTitle,

    currentUser,
  } = useChat();

  const handleGetCurrentChat = async (id: string) => {
    const { data } = await getRoom(id);
    handle(data);
  };

  const checkExitsRoom = async (userId: string) => {
    const { data } = await getCurrentChat(userId);
    handle(data);
  };

  const handle = async (data: any) => {
    if (data.type === 'user') {
      const userId: string = data.users.find((item: any) => item !== currentUser._id);
      // listUsers && setTitle(listUsers[user]);
      const { data: dataUser } = await getUser(userId);
      setTitle(dataUser.name);
    } else {
      setTitle(data.name);
    }

    const { _id: userId } = getUserLocal();
    const receiveIds = data.users.filter((item: any) => item != userId);
    setSelectedUser(data._id);
    setRoomId(data?._id);
    localStorage.setItem('roomId', data?._id);
    setMessages(data?.messages);
    setReceive(receiveIds);
  };

  return { handleGetCurrentChat, checkExitsRoom };
};

export default useUserOnline;
