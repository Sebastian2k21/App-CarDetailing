import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApiClient } from "../api/ApiClientContext";


const Navbar = ({access}) => { 
    const [role, setRole] = useState(null);
    const apiClient = useApiClient();

    const getRole = useCallback(async () => {
        if(access) {
            const data = await apiClient.getUserRole()
            if(data) {
                setRole(data);
            }
       
        }
    }, [access, setRole]);


    useEffect(() => {
        getRole()
    }, [getRole])

    return (
        <nav>
        <ul>
            <li><Link to="/services">Services</Link></li> 
            {access != null ?
            <>
                <li><Link to="/">Home</Link></li> 
                <li><Link to="/account">Account</Link></li> 
                <li><Link to="/profile">Profile</Link></li> 
                {role != null && role.role_name === "detailer" && <li><Link to="/detailer">Detailer</Link></li>}
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