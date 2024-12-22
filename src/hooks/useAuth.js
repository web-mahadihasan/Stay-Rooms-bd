import { useContext } from "react"
import { AuthContextProvider } from "../context/AuthContext";

const useAuth = () =>  {
    const context = useContext(AuthContextProvider)
    return context;
}

export default useAuth;