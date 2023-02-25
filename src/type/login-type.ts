export default interface LOGINTYPE {
  username: string;
  password: string;
  handleGetUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGetPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submit: () => Promise<void>;
}
