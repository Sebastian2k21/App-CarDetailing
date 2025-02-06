import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useRole } from "../context/RoleContext";
import { useLeftNav } from "../context/LeftNavContext";
import logoPro from '../media/logoPro.png';

const Navbar = ({ access }) => {
    const role = useRole();
    const { setIsOpenLeftNav } = useLeftNav();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#1a1a1a', padding: '10px 20px' }}>
            <div className="container-fluid">
                {/* Logo */}
                <Link to="/" className="navbar-brand d-flex align-items-center" style={{ color: '#d4af37', gap: '10px' }}>
                    <img
                        src={logoPro}
                        alt="ProDetailing Logo"
                        style={{ width: '60px', height: 'auto', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0,0,0,0.5)' }}
                    />
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                        ProDetailing
                    </span>
                </Link>

                {/* Toggle button for mobile */}
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

                {/* Navbar Links */}
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link bi bi-tools" to="/services" style={{ color: '#d4af37' }}> Services</Link>
                        </li>
                        {access != null ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-house-door-fill" to="/" style={{ color: '#d4af37' }}> Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-person-square" to="/account" style={{ color: '#d4af37' }}> Account</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-person-vcard" to="/profile" style={{ color: '#d4af37' }}> Profile</Link>
                                </li>
                                {role != null && role.role_name === "client" && (
                                    <li className="nav-item">
                                        <Link className="nav-link bi bi-car-front" to="/my-cars" style={{ color: '#d4af37' }}> My Cars</Link>
                                    </li>
                                )}
                                {role != null && role.role_name === "detailer" && (
                                    <li className="nav-item">
                                        <button
                                            onClick={() => setIsOpenLeftNav(true)}
                                            className="nav-link"
                                            style={{ color: '#d4af37', background: 'none', border: 'none', cursor: 'pointer' }}
                                        >
                                            Detailer
                                        </button>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-door-open-fill" to="/logout" style={{ color: '#d4af37' }}> Logout</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-house-door-fill" to="/" style={{ color: '#d4af37' }}> Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-r-square-fill" to="/register" style={{ color: '#d4af37' }}> Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link bi bi-box-arrow-in-right" to="/login" style={{ color: '#d4af37' }}> Login</Link>
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
