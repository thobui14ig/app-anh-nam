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

export { getToken, getUserLocal, hasmapUser };
