import { useEffect, useState } from 'react';

import { getListChatUser } from '../../../api/Chat/chat';
import { useChat } from '../../../context/app.context';
export const useListMessageUser = () => {
  const [listChats, setListChats] = useState([]);
  const { currentUser } = useChat();
  console.log(33333);

  useEffect(() => {
    const fetch = async () => {
      const data = await getListChatUser(currentUser?._id);
      setListChats(data.data.listChats);
    };
    fetch();
  }, []);
  return { listChats };
};
