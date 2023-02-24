import './login.scss';

import useLogin from './modules/useLogin';

const Login = () => {
  const { handleGetPassword, handleGetUsername, password, submit, username } = useLogin();

  return (
    <div className="container-login">
      <div className="content">
        <div className="item-child">
          <input
            className="username"
            value={username}
            onChange={(e) => handleGetUsername(e)}
            placeholder="user name"
            title="username"
            type="text"
          />
          <input
            className="password"
            value={password}
            onChange={(e) => handleGetPassword(e)}
            placeholder="Password"
            title="password"
            type="password"
          />
          <button className="submit" onClick={submit}>
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
