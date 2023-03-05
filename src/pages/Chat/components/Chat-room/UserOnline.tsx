/* eslint-disable jsx-a11y/click-events-have-key-events */

import { useChat } from '../../../../context/app.context';
import { getUserLocal } from '../../../../helper';
import { Roles } from '../../../../type/role.enum';
import ModalCreateMessageUser from '../Modal/ModalCreateMessage';
import ListMessageUser from './ListMessageUsers';

const ListMessage = () => {
  const user = getUserLocal();
  const { showModal } = useChat();
  return (
    <>
      <div className="bg-gray-200 w-1/4 p-1 overflow-y-scroll">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div className="text-gray-700 font-medium pb-2 text-xl">Messages</div>
          {Number(user.role) === Roles.ADMIN ? (
            <button
              className="text-gray-700 font-medium pb-2"
              onClick={() => showModal()}
            >
              +
            </button>
          ) : (
            ''
          )}
        </div>
        <ListMessageUser />
      </div>
      <ModalCreateMessageUser />
    </>
  );
};

export default ListMessage;
