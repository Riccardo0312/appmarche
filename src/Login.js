/*import React from 'react';
import './Login.css';


const Login = () => {
    return (
        <section>
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" required />
                <p>
                    <button type="submit">Accedi</button>
                </p>
            </form>
        </section>
    );
};

export default Login;
*/

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const utenteRegistrato = JSON.parse(localStorage.getItem("utenteRegistrato"));

        if (
            utenteRegistrato &&
            username === utenteRegistrato.username &&
            password === utenteRegistrato.password
        ) {
            navigate('/strutture');
        } else {
            alert('Credenziali non valide');
        }
    };

    return (
        <section>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />

                <p>
                    <button type="submit">Accedi</button>
                </p>
            </form>
        </section>
    );
};

export default Login;