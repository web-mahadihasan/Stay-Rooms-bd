import { useContext } from "react"
import { AppContextProvier } from "../context/AppContext";

const useAppContext = () =>  {
    const context = useContext(AppContextProvier)
    return context;
}

export default useAppContext;