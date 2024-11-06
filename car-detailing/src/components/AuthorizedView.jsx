import { useEffect } from "react";
import { useToken } from "../context/TokenContext";
import { useNavigate } from "react-router-dom";


const AuthorizedView = ({ children }) => {
    const {access} = useToken()
    const navigate = useNavigate()

    useEffect(() => {
        if (!access) {
            navigate("/login")
        }
    }, [access])

    return access ? children : null
}

export default AuthorizedView;