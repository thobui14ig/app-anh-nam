import { Roles } from '../type/role.enum';

const hasmapUser = (users: any) => {
  return users.reduce(function (map: any, obj: any) {
    map[obj._id] = obj?.name;
    return map;
  }, {});
};

const getToken = () => {
  return localStorage.getItem('accessToken');
};

const getUserLocal = (): {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
} => {
  return JSON.parse(localStorage.getItem('userInfo') as string);
};

function randomColor() {
  // Generate a random hex value between 0x000000 and 0xFFFFFF
  const hex = Math.floor(Math.random() * 0xffffff);

  // Convert the hex value to a 6-digit string
  const color = '#' + hex.toString(16).padStart(6, '0');

  return color;
}

const isAdmin = () => {
  const user = getUserLocal();
  return Number(user.role) === Roles.ADMIN;
};
const isUser = () => {
  const user = getUserLocal();
  return Number(user.role) === Roles.USER;
};

export { getToken, getUserLocal, hasmapUser, isAdmin, isUser, randomColor };
