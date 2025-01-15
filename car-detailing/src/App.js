import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import TimeAgo from 'javascript-time-ago';
import pl from 'javascript-time-ago/locale/pl';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import './HomePage.css'; // Import pliku CSS dla HomePage
import ApiClientWrapper from './api/ApiClientContext';
import Account from './components/Account';
import AuthorizedView from './components/AuthorizedView';
import Error404 from './components/Error404';
import Home from './components/Home';
import HomePage from './components/HomePage';
import LeftNav from './components/LeftNav';
import LoginForm from './components/LoginForm';
import Logout from './components/Logout';
import MyCars from './components/MyCars';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import RegisterForm from './components/RegisterForm';
import ServiceDetails from './components/ServiceDetails';
import ServiceUpdate from './components/ServiceUpdate';
import Services from './components/Services';
import DetailerAnalytics from './components/detailer/DetailerAnalytics';
import DetailerClients from './components/detailer/DetailerClients';
import DetailerInvoices from './components/detailer/DetailerInvoices';
import DetailerOrders from './components/detailer/DetailerOrders';
import DetailerServices from './components/detailer/DetailerServices';
import DetailerTeam from './components/detailer/DetailerTeam';
import LeftNavContext from './context/LeftNavContext';
import RoleWrapper from './context/RoleContext';
import TokenContext from './context/TokenContext';
import DetailerCreateInvoice from './components/detailer/DetailerCreateInvoice';


TimeAgo.addDefaultLocale(pl)

function App() {
    const [access, setAccessState] = useState(localStorage.getItem('access'));
    const [refresh, setRefreshState] = useState(localStorage.getItem('refresh'));
    const [isOpenLeftNav, setIsOpenLeftNav] = useState(false)

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
                    <RoleWrapper>
                        <LeftNavContext.Provider value={{isOpenLeftNav: isOpenLeftNav, setIsOpenLeftNav: setIsOpenLeftNav}}>
                            <header className="App-header">
                                <Navbar access={access} />
                                <LeftNav/>
                                <Routes>
                                    <Route path="/register" element={<RegisterForm />} />
                                    <Route path="/login" element={<LoginForm />} />

                                    <Route path="/account" element={<AuthorizedView><Account /></AuthorizedView>} />
                                    <Route path="/services" element={<Services/>} />
                                    <Route path="/services/:id" element={<AuthorizedView><ServiceDetails/></AuthorizedView>} />
                                    <Route path="/services/:id/update" element={<ServiceUpdate/>}/>
                                    <Route path="/profile" element={<AuthorizedView><Profile/></AuthorizedView>} />
                                    <Route path="/my-cars" element={<AuthorizedView><MyCars/></AuthorizedView>} />

                                    <Route path="/detailer/services" element={<AuthorizedView><DetailerServices/></AuthorizedView>} />
                                    <Route path="/detailer/orders" element={<AuthorizedView><DetailerOrders/></AuthorizedView>} />
                                    <Route path="detailer/team" element={<AuthorizedView><DetailerTeam/></AuthorizedView>} />
                                    <Route path="detailer/clients" element={<AuthorizedView><DetailerClients/></AuthorizedView>} />
                                    <Route path="detailer/analytics" element={<AuthorizedView><DetailerAnalytics/></AuthorizedView>} />

                                    <Route path="detailer/invoices" element={<AuthorizedView><DetailerInvoices/></AuthorizedView>} />
                                    <Route path="detailer/invoices/create" element={<AuthorizedView><DetailerCreateInvoice/></AuthorizedView>} />

                                    <Route path="/logout" element={<AuthorizedView><Logout/></AuthorizedView>} />
                                    <Route path="/" element={access != null ? <Home/> : <HomePage />} />
                                    <Route path="*" element={<Error404/>} />
                                </Routes>
                            </header>
                        </LeftNavContext.Provider>
                        <Toaster />
                    </RoleWrapper>
                </ApiClientWrapper>
            </TokenContext.Provider>
        </div>
    );
}


export default App;
