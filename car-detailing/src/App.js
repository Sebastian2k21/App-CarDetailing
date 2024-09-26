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
import Home from './components/Home';
import Navbar from './components/Navbar';
import Detailer from './components/Detailer';
import ServiceUpdate from './components/ServiceUpdate';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MyCars from './components/MyCars';


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
                        <Navbar access={access} />
                        <Routes>
                            <Route path="/register" element={<RegisterForm />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/services" element={<Services/>} />
                            <Route path="/services/:id" element={<ServiceDetails/>} />
                            <Route path="/services/:id/update" element={<ServiceUpdate/>}/>
                            <Route path="/profile" element={<Profile/>} />
                            <Route path="/my-cars" element={<MyCars/>} />
                            <Route path="/detailer" element={<Detailer/>} />
                            <Route path="/logout" element={<Logout/>} />
                            <Route path="/" element={<Home />} /> {/* Użyj komponentu HomePage */}
                        </Routes>
                    </header>
                    <Toaster />
                </ApiClientWrapper>
            </TokenContext.Provider>
        </div>
    );
}


export default App;
