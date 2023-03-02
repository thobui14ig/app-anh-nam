import { Link } from 'react-router-dom';

import { getUserLocal } from '../helper';
import { Roles } from '../type/role.enum';

const LeftMenu = () => {
  const user = getUserLocal();
  return (
    <div className="bg-gray-900 text-white w-1/6 p-4 max-w-xs">
      <ul>
        {Number(user.role) === Roles.ADMIN ? (
          <>
            <li className="mb-4 text-base">
              <Link to="task">
                <span className="text-white">Task</span>
              </Link>
            </li>
            <li className="mb-4 text-base">
              <Link to="message">
                <span className="text-white">Message</span>
              </Link>
            </li>
            <li className="mb-4 text-base">
              <Link to="users">
                <span className="text-white">Quản lý nhân viên</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mb-4 text-base">
              <Link to="/work-list">
                <span className="text-white">Task list</span>
              </Link>
            </li>
            <li className="mb-4 text-base">
              <Link to="message">
                <span className="text-white">Message</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default LeftMenu;
