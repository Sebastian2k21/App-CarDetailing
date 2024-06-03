import { createContext } from "react"

const TokenContext = createContext({access: null, refresh: null, setAccess: () => {}, setRefresh: () => {}});

export default TokenContext;