import { useEffect } from "react";
import { useApiClient } from "../api/ApiClientContext";
import { useNavigate } from "react-router-dom";
import { useToken } from "../context/TokenContext";

const Logout = () => {
    const { setAccess, setRefresh } = useToken()
    const navigate = useNavigate();
    const apiClient = useApiClient();
    
    useEffect(() => {
        setAccess(null);
        setRefresh(null);
        apiClient.setToken(null)
        navigate('/login');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
}

export default Logout;
