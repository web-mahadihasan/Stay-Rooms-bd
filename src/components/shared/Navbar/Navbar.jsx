import { Link, NavLink } from "react-router";
import logo from "../../../assets/images/stayroom.png"
import { MdOutlineNotificationsActive } from "react-icons/md";
import { HiMenu } from "react-icons/hi";
import useAppContext from "../../../hooks/useAppContext";
import MobileMenuAside from "./MobileMenuAside";
import useAuth from "../../../hooks/useAuth";
import CurrentUser from "./CurrentUser";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
    
    const {user, loginUser} = useAuth()
    const {setOpenMenu} = useAppContext();

    const navLinks = <>
        <li> <Link to={"/"}>Home</Link> </li>
        <li><Link to={"/rooms"}>Rooms</Link></li>
        <li><Link to={"/my-bookings"}>My Bookings</Link></li>
        <li><Link>About Us</Link></li>
        <li><Link>Contact Us</Link></li>
    </>
    return (
        <div className="py-3 border-b shadow">
            <div className="container mx-auto px-4 xl:px-0 flex items-center justify-between">
                {/* Logo  */}
                <div>
                    <Link to={"/"}><img src={logo} alt="Stay Rooms" className="h-10 md:h-12"/></Link>
                </div>

                {/* Nav links  */}
                <div className="hidden lg:block">
                    <ul className="flex uppercase items-center text-sm font-medium text-secondary-black gap-4">
                        {navLinks}
                    </ul>
                </div>

                {/* Action button  */}
                <div className="flex items-center gap-2">
                    {
                        loginUser ? <div className="flex items-center gap-3">
                            <span className="p-2 border bg-base-200 rounded-full cursor-pointer"><MdOutlineNotificationsActive size={23} className="text-primary"/></span>
                            {/* <img src="" alt="" className="w-10 h-10 rounded-full"/> */}
                            <details className="dropdown dropdown-end">
                                <summary className="btn p-0 bg-transparent hover:bg-transparent rounded-full flex items-center gap-2 px-2">
                                    <img src={user?.photoURL} alt="" className="w-9 h-9 rounded-full ring-2 ring-offset-2 ring-[#a38ffd]"/>
                                    <IoIosArrowDown size={20} />
                                </summary>
                                <ul className="menu dropdown-content bg-base-100 z-[1] p-2 min-w-60 space-y-2 border shadow-md rounded-md border-t-4 border-t-primary mt-3">
                                    <CurrentUser/>
                                </ul>
                            </details>
                        </div> : (<div className="hidden font-medium md:flex items-center">
                        <Link to={"/auth/login"}><button className="px-5 py-1.5 bg-white text-primary rounded shadow-md border border-primary hover:bg-primary hover:text-white hover:border-primary duration-500">Login</button></Link>
                        <div className="mx-2 text-sm font-medium">OR</div>
                        <Link to={"/auth/register"}><button className="px-5 py-1.5 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 tracking-wide">Register</button></Link>
                    </div>)
                    }
                    {/* Hamburger  */}
                    <div onClick={() => setOpenMenu(true)} className="lg:hidden"><HiMenu size={30} /></div>
                    <aside>
                        <MobileMenuAside/>
                    </aside>
                </div>
            </div>
            
        </div>
    );
};

export default Navbar;




// {/* <img src="" alt="" className="w-10 h-10 rounded-full"/> */}
// <details className="dropdown dropdown-end">
// <summary className="btn p-0 w-12 h-10 rounded-full">
//     <img src="" alt="" className="w-full h-full rounded-full"/>
// </summary>
// <ul className="menu dropdown-content bg-base-100 z-[1] p-2 w-56 space-y-2 border shadow-md rounded-md border-t-4 border-t-primary mt-3">
// <CurrentUser/>
// </ul>
// </details>