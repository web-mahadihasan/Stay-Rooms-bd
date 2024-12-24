import { RiArrowRightSLine, RiCloseLargeLine } from "react-icons/ri";
import logo from "../../../assets/images/stayroom.png"
import { Link, NavLink } from "react-router";
import { LuPhoneCall } from "react-icons/lu";
// import NavUserInfo from "../NavUserInfo/NavUserInfo";
import useAuth from "../../../hooks/useAuth";
import useAppContext from "../../../hooks/useAppContext";

const MobileMenuAside = () => {
    const {openMenu, setOpenMenu} = useAppContext();
    const {user} = false;

    const navLinks = [
        { "path": "/", "element": "Home" },
        { "path": "/rooms", "element": "Rooms" },
        { "path": "/my-bookings", "element": "My Bookings" },
        { "path": "/about-us", "element": "About Us" },
        { "path": "/contact", "element": "Contact" }
      ]
    return (
        <div className={`absolute lg:hidden z-40 duration-700 min-h-screen ${ openMenu? "top-0 left-0 block" : "-left-[800px] top-0"}`}>
            <div className="menu flex flex-col justify-between bg-base-200 text-base-content min-h-screen w-80 p-4 overflow-y-scroll">
            {/* Sidebar content here */}
                <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-2">
                        <Link to={"/"}><img src={logo} alt="Job Peak" className="h-10 md:h-12"/></Link>
                    </div>
                    {/* Menu Close  */}
                    <button onClick={() => setOpenMenu(false)} className="p-2 border border-black/65 cursor-pointer rounded-full">
                        <RiCloseLargeLine size={22} className=""/>
                    </button>
                </div>

                {/* Nav Links  */}
                <div className="mt-8">
                    <ul className="flex flex-col gap-1 space-y-2">
                        {
                            navLinks.map(link =>  <li key={link.element}>
                                <NavLink to={link.path} className={"font-normal text-[15px] text-[#100C08] uppercase flex justify-between"}>{link.element} <RiArrowRightSLine size={22}/></NavLink>
                            </li>)
                        }
                    </ul>
                </div>

                {/* User Log in & register  <NavUserInfo/>*/}
                {
                    user ? <div className="m-3 md:hidden">hello</div> : (<div className="font-medium flex items-center md:hidden">
                        <Link to={"/auth/login"}><button className="px-5 py-1.5 bg-white text-primary rounded shadow-md border border-primary hover:bg-primary hover:text-white hover:border-primary duration-500">Login</button></Link>
                        <div className="mx-2 text-sm font-medium">OR</div>
                        <Link to={"/auth/register"}><button className="px-5 py-1.5 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500">Register</button></Link>
                    </div>)
                }
                {/* More query  */}
                <div className="py-1">
                <div className="divider my-2"></div>
                    <div className="flex items-center gap-3">
                        <div className="px-2 border-r-2 border-gray-500">
                            <LuPhoneCall size={28} className="text-primary"/>
                        </div>
                        <div>
                            <p className="font-medium text-base">To More Inquery</p>
                            <h4 className="text-primary font-semibold text-lg">+1962454121</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenuAside;

