import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/login';

const Login = () => {
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser({ user_name, password }));
    };

    return (
        <form className="Login container" onSubmit={handleSubmit}>
            <label className="has-text-white is-size-4">
                Username:
                <input
                    style={{ margin: '0.5vw' }}
                    className="input is-medium is-rounded"
                    type="text"
                    name="user_name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setUserName(e.target.value);
                    }}
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
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setPassword(e.target.value);
                    }}
                />
            </label>
            <br />
            <input
                className="button is-white is-outlined is-medium"
                type="submit"
            />
        </form>
    );
};

export default Login;
