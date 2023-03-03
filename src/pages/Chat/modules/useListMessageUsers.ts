import { useEffect, useState } from 'react';

import { getListChatUser } from '../../../api/Chat/chat';
import { useChat } from '../../../context/app.context';
export const useListMessageUser = () => {
  const [listChats, setListChats] = useState([]);
  const { currentUser, isRenderListMessage } = useChat();

  useEffect(() => {
    const fetch = async () => {
      const data = await getListChatUser(currentUser?._id);
      setListChats(data.data.listChats);
    };
    fetch();
  }, [isRenderListMessage]);

  return { listChats };
};
