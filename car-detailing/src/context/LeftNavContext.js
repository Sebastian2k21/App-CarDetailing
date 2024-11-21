import { createContext, useContext } from "react"

const LeftNavContext = createContext({isOpenLeftNav: null, setIsOpenLeftNav: null});

export const useLeftNav = () => { 
    return useContext(LeftNavContext)
}

export default LeftNavContext;