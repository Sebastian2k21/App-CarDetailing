import React, { useState } from 'react';
import './App.css';
import './HomePage.css'; // Import pliku CSS dla HomePage
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm'; 
import { Route, Routes, Link } from 'react-router-dom';
import TokenContext from './context/TokenContext';
import Account from './components/Account';
import ApiClientWrapper from './api/ApiClientContext';
import Services from './components/Services';
import ServiceDetails from './components/ServiceDetails';
import Logout from './components/Logout';
import { Toaster } from 'react-hot-toast';
import Profile from './components/Profile';

function App() {
    const [access, setAccessState] = useState(localStorage.getItem('access'));
    const [refresh, setRefreshState] = useState(localStorage.getItem('refresh'));

    const setAccess = (access) => { 
        if (access == null) {
            setAccessState(null);
            localStorage.removeItem('access');
        } else {
            setAccessState(access);
            localStorage.setItem('access', access);
        }
    }

    const setRefresh = (refresh) => { 
        if (refresh == null) { 
            setRefreshState(null);
            localStorage.removeItem('refresh');
        } else {
            setRefreshState(refresh);
            localStorage.setItem('refresh', refresh);
        }
    }

    return (
        <div className="App">
            <TokenContext.Provider value={{ access, refresh, setAccess, setRefresh }}>
                <ApiClientWrapper>
                    <header className="App-header">
                        <nav>
                            <ul>
                                <li><Link to="/services">Services</Link></li> 
                                {access != null ?
                                <>
                                    <li><Link to="/">Home</Link></li> 
                                    <li><Link to="/account">Account</Link></li> 
                                    <li><Link to="/profile">Profile</Link></li> 
                                    <li><Link to="/logout">Logout</Link></li> 
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
                            <Route path="/services" element={<Services/>} />
                            <Route path="/services/:id" element={<ServiceDetails/>} />
                            <Route path="/profile" element={<Profile/>} />
                            <Route path="/logout" element={<Logout/>} />
                            <Route path="/" element={<HomePage />} /> {/* Użyj komponentu HomePage */}
                        </Routes>
                    </header>
                    <Toaster />
                </ApiClientWrapper>
            </TokenContext.Provider>
        </div>
    );
}

function HomePage() {
    return (
        <div className="home-page">
            <h1>CarDetailing</h1>
            <p>Witamy w naszym serwisie CarDetailing, gdzie oferujemy najlepsze usługi detalingowe dla Twojego pojazdu!</p>
            <Link to="/services" className="cta-button">Nasze usługi</Link>
        </div>
    );
}

export default App;
