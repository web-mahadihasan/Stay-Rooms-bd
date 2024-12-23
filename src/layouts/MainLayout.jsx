import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar/Navbar";
import "../styles/App.css"
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <div>
            <Toaster />
            {/* Navbar  */}
            <header className="sticky top-0 z-50 backdrop-blur-3xl bg-white/65">
                <Navbar/>
            </header>

            {/* Main content  */}
            <main className="min-h-[calc(100vh-300px)]">
                <Outlet/>
            </main>
            
        </div>
    );
};

export default MainLayout;