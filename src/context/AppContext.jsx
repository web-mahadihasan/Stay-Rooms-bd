import { createContext, useEffect, useState } from "react";


export const AppContextProvier = createContext(null)

const AppContext = ({children}) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Apply default theme on mount
    useEffect(() => {
        // Default to light theme
        if(isDark){
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            setIsDark(true);
        }else{
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
        
    }, []);
    
    // Toggle theme
    const toggleTheme = (theme) => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
            setIsDark(true);
        } else {
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    };

    const appContextInfo = {
        openMenu, 
        setOpenMenu,
        toggleTheme,
        isDark, 
        setIsDark
    }

    return (
        <AppContextProvier.Provider value={appContextInfo}>
            {children}
        </AppContextProvier.Provider>
    )
}

export default AppContext;