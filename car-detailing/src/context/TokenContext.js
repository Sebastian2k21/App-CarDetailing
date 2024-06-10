import { createContext, useContext } from "react"

const TokenContext = createContext({access: null, refresh: null, setAccess: () => {}, setRefresh: () => {}});

export const useToken = () => { 
    return useContext(TokenContext)
}

export default TokenContext;