import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApiClient } from "../api/ApiClientContext";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = ({ access }) => {
    const [role, setRole] = useState(null);
    const apiClient = useApiClient();

    const getRole = useCallback(async () => {
        if (access) {
            const data = await apiClient.getUserRole();
            if (data) {
                setRole(data);
            }
        }
    }, [access, setRole]);

    useEffect(() => {
        getRole();
    }, [getRole]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="container-fluid">
                <text className="navbar-brand" style={{ color: '#d4af37' }}>ProDetailng</text>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link bi bi-tools" to="/services" style={{ color: '#d4af37' }}>Services</Link>
                        </li>
                        {access != null ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-house-door-fill" to="/" style={{ color: '#d4af37' }}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi-person-square" to="/account" style={{ color: '#d4af37' }}>Account</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-person-vcard" to="/profile" style={{ color: '#d4af37' }}>Profile</Link>
                                </li>
                                {role != null && role.role_name === "client" && (
                                    <li className="nav-item">
                                        <Link className="nav-link bi bi-car-front" to="/my-cars" style={{ color: '#d4af37' }}>My Cars</Link>
                                    </li>
                                )}
                                {role != null && role.role_name === "detailer" && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/detailer" style={{ color: '#d4af37' }}>Detailer</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/team" style={{ color: '#d4af37' }}>Team</Link>
                                        </li>
                                    </>
                                )}
                                {role != null && role.role_name === "detailer" && (
                                    <li className="nav-item">
                                        <Link className="nav-link bi bi-basket2-fill" to="/detailer/orders" style={{ color: '#d4af37' }}>Orders</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-door-open-fill" to="/logout" style={{ color: '#d4af37' }}>Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-r-square-fill" to="/register" style={{ color: '#d4af37' }}>Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-box-arrow-in-right" to="/login" style={{ color: '#d4af37' }}>Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
