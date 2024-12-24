import { Outlet, useLocation } from "react-router";
import Navbar from "../components/shared/Navbar/Navbar";
import "../styles/App.css"
import { Toaster } from "react-hot-toast";
import Footer from "../components/shared/Footer/Footer";
import AutoShowModal from "../components/common/AutoShowModal";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const [autoShowModal, setAutoShowModal] = useState(false)
    const {pathname} = useLocation()

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

            {/* Auto Show Modal  */}
            {/* <div>
                {
                    pathname ===   "/" && <AutoShowModal autoShowModal={autoShowModal} setAutoShowModal={setAutoShowModal}/>
                }
            </div> */}
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