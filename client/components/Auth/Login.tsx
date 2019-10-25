import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/login';

const Login = () => {
  const [user_name, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  
  const updateDetails = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'user_name') setUserName(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ user_name, password }));
  }

  return (
    <form className="Login container" onSubmit={handleSubmit}>
        <label className="has-text-white is-size-4">
          Username:
          <input
            style={{ margin: '0.5vw' }}
            className="input is-medium is-rounded"
            type="text"
            name="user_name"
            onChange={updateDetails}
          />
        </label>
        <br />
        <label className="has-text-white is-size-4">
          Password:
          <input
            style={{ margin: '0.5vw' }}
            className="input is-medium is-rounded"
            type="password"
            name="password"
            onChange={updateDetails}
          />
        </label>
        <br />
        <input
          className="button is-white is-outlined is-medium"
          type="submit"
        />
      </form>
  )
}

export default Login;
