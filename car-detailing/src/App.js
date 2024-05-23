import React from 'react';
import './App.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm'; 
import { Route, Routes, Link } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/register">Register</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/" element={<h1> CarDetailing </h1>} />
                </Routes>
            </header>
        </div>
    );
}

export default App;
