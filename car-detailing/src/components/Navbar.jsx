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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <text className="navbar-brand">ProDetailng</text>
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
                            <Link className="nav-link bi bi-tools" to="/services">Services</Link>
                        </li>
                        {access != null ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-house-door-fill" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi-person-square" to="/account">Account</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi bi-person-vcard " to="/profile">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-car-front" to="/my-cars">My Cars</Link>
                                </li>
                                {role != null && role.role_name === "detailer" && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/detailer">Detailer</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/team">Team</Link>
                                        </li>
                                   </>
                                )}
                                {role != null && role.role_name === "detailer" && (
                                    <li className="nav-item">
                                        <Link className="nav-link bi bi-basket2-fill" to="/detailer/orders">Orders</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-door-open-fill" to="/logout">Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-r-square-fill" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-box-arrow-in-right" to="/login">Login</Link>
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
