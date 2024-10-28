import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useToken } from "./TokenContext";
import { useApiClient } from "../api/ApiClientContext";

const RoleContext = createContext(null);

export const useRole = () => { 
    return useContext(RoleContext)
}


const RoleWrapper = ({children}) => {
    const [role, setRole] = useState(null);
    const apiClient = useApiClient();
    const { access } = useToken();

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
        <RoleContext.Provider value={role}>
            {children}
        </RoleContext.Provider>
    )
}

export default RoleWrapper;
