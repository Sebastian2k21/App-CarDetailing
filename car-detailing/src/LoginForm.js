import React from 'react';

const LoginForm = () => {
    return (
        <form>
            <div>
                <label>
                    Email:
                    <input type="email" name="email" required />
                </label>
            </div>
            <div>
                <label>
                    Hasło:
                    <input type="password" name="password" required />
                </label>
            </div>
            <button type="submit">Zaloguj się</button>
        </form>
    );
};

export default LoginForm;
