import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUserRequest } from '../../actions/register';

const Register = () => {
    const [user_name, setUserName] = useState('');
    const [display_name, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [img, setImage] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password == confirm_password) {
            dispatch(
                registerUserRequest({ user_name, display_name, img, password })
            );
        }
    };

    return (
        <form className="Register container" onSubmit={handleSubmit}>
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
                Display Name:
                <input
                    style={{ margin: '0.5vw' }}
                    className="input is-medium is-rounded"
                    type="text"
                    name="display_name"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setDisplayName(e.target.value);
                    }}
                />
            </label>
            <br />
            <label className="has-text-white is-size-4">
                Profile Image url:
                <input
                    style={{ margin: '0.5vw' }}
                    className="input is-medium is-rounded"
                    type="text"
                    name="img"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setImage(e.target.value);
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
            <label className="has-text-white is-size-4">
                Confirm:
                <input
                    style={{ margin: '0.5vw' }}
                    className="input is-medium is-rounded"
                    type="password"
                    name="confirm_password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setConfirmPassword(e.target.value);
                    }}
                />
            </label>
            <br />
            <input
                className="button is-medium is-white is-outlined"
                type="submit"
            />
        </form>
    );
};

export default Register;
