import { createContext, useState } from "react";


export const AppContextProvier = createContext(null)

const AppContext = ({children}) => {
    const [openMenu, setOpenMenu] = useState(false);

    const appContextInfo = {
        openMenu, 
        setOpenMenu
    }

    return (
        <AppContextProvier.Provider value={appContextInfo}>
            {children}
        </AppContextProvier.Provider>
    )
}

export default AppContext;