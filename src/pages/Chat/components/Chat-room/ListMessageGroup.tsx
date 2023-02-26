/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import useUserOnline from '../../modules/useUserOnline';
const users = [
  { _id: '63a6cae6d4b4cc4dde8f9098', name: 'Tho' },
  { _id: '63e51c066c87521b8473125e', name: 'Tanh' },
  { _id: '63f9b45d315c6cba5621af61', name: 'Tuan' },
];

const ListMessageGroups = () => {
  return (
    <ul className="mt-6">
      {users.map((user: any) => {
        return (
          <li
            key={user._id}
            className="text-gray-600 mb-2 hover:bg-sky-200 p-2 rounded-md cursor-pointer"
            // onClick={() => handleGetCurrentChat(user._id)}
          >
            <span>Group</span>
          </li>
        );
      })}
    </ul>
  );
};

export default ListMessageGroups;
