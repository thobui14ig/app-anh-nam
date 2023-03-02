export default interface USER_TYPE {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  password: string;
  listChats: string[];
  role: string;
}
