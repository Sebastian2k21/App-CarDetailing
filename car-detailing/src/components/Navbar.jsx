import { Link } from "react-router-dom";


const Navbar = ({access}) => { 
    return (
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
    )
}

export default Navbar;