import React, { useState } from 'react';
import './App.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm'; 
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import TokenContext from './context/TokenContext';
import Account from './Account';

function App() {
    const [access, setAccessState] = useState(localStorage.getItem('access'));
    const [refresh, setRefreshState] = useState(localStorage.getItem('refresh'));
    const navigate = useNavigate();

    const setAccess = (access) => { 
        if(access == null) {
            setAccessState(null);
            localStorage.removeItem('access');
        }  else {
            setAccessState(access);
            localStorage.setItem('access', access);
        }
    }

    const setRefresh = (refresh) => { 
        if(refresh == null) { 
            setRefreshState(null);
            localStorage.removeItem('refresh');
        } else {
            setRefreshState(refresh);
            localStorage.setItem('refresh', refresh);
        }
    }

    const logoutUser = () => {
        setAccess(null);
        setRefresh(null);
        navigate("/login")
    }

    return (
        <div className="App">
            <TokenContext.Provider value={{ access, refresh, setAccess, setRefresh }}>
                <header className="App-header">
                    <nav>
                        <ul>
                            {access != null ?
                            <>
                                <li><Link to="/">Home</Link></li> 
                                <li><Link to="/account">Account</Link></li> 
                                <li><Link onClick={logoutUser} to="/login">Logout</Link></li> 
                            </>
                            :
                            <>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/login">Login</Link></li>
                            </>

                            }
                        </ul>
                    </nav>
                    <Routes>
                        <Route path="/register" element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/account" element={<Account />} />
                        <Route path="/" element={<h1> CarDetailing </h1>} />
                    </Routes>
                </header>
            </TokenContext.Provider>
        </div>
    );
}

export default App;
