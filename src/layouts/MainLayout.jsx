import { Outlet, useLocation } from "react-router";
import Navbar from "../components/shared/Navbar/Navbar";
import "../styles/App.css"
import { Toaster } from "react-hot-toast";
import Footer from "../components/shared/Footer/Footer";
import AutoShowModal from "../components/common/AutoShowModal";
import { useEffect, useState } from "react";
import useAppContext from "../hooks/useAppContext";
import { LuSunMedium } from "react-icons/lu";
import { RiMoonClearLine } from "react-icons/ri";

const MainLayout = () => {
    const [autoShowModal, setAutoShowModal] = useState(false)
    const {pathname} = useLocation()
    const {isDark, toggleTheme} = useAppContext()

    useEffect(() => {
        setAutoShowModal(true);
    }, []);

    return (
        <div>
            <Toaster />
            {/* Navbar  */}
            <header className="sticky top-0 z-50 backdrop-blur-3xl bg-white/65">
                <Navbar/>
            </header>
            <div className="fixed left-1 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-3 bg-gray-400 backdrop-blur-3xl w-fit text-white p-2 rounded-full">
                <button onClick={() =>  toggleTheme('dark')} className="relative w-6 h-6"><RiMoonClearLine size={20}/>{isDark && <span className="w-full rounded-full h-full bg-white absolute top-0 right-0"></span>}</button>
                <button onClick={() => toggleTheme('light')} className="relative w-6 h-6"><LuSunMedium size={20}/>{!isDark && <span className="w-full rounded-full h-full bg-white absolute top-0 right-0"></span>}</button>
            </div>
            {/* Auto Show Modal  */}
            <div>
                {
                    pathname ===   "/" && <AutoShowModal autoShowModal={autoShowModal} setAutoShowModal={setAutoShowModal}/>
                }
            </div>
            {/* Main content  */}
            <main className="min-h-[calc(100vh-300px)]">
                <Outlet/>
            </main>
            
            <Footer>
                <Footer/>
            </Footer>
        </div>
    );
};

export default MainLayout;