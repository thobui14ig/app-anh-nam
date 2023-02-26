/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useChat } from '../../../../context/app.context';
import { useListMessageUser } from '../../modules/useListMessageUsers';
import useUserOnline from '../../modules/useUserOnline';

const ListMessageUsers = () => {
  const { listUsers, currentUser } = useChat();
  const { handleGetCurrentChat } = useUserOnline();
  const { listChats } = useListMessageUser();
  const list = listChats.map((item: any) => {
    return item.users.find((user: any) => user !== currentUser._id);
  });

  return (
    <ul className="mt-6">
      {list &&
        listUsers &&
        list.map((chat, index) => {
          return (
            <li
              key={index}
              className="text-gray-600 mb-2 hover:bg-sky-200 p-2 rounded-md cursor-pointer"
              onClick={() => handleGetCurrentChat(chat)}
            >
              <span>{listUsers[chat]}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default ListMessageUsers;
