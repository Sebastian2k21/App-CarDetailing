import { createContext, useContext } from "react"
import ApiClient from "./ApiClient";

const ApiClientContext = createContext(null);

export const useApiClient = () => {
    return useContext(ApiClientContext)
}

const ApiClientWrapper = ({children}) => {
    const apiClient = new ApiClient()

    return (
        <ApiClientContext.Provider value={apiClient}>
            {children}
        </ApiClientContext.Provider>
    )
}

export default ApiClientWrapper;