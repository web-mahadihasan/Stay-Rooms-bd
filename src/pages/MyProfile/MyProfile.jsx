import { IoCheckmarkDoneOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { HiOutlineArrowRight } from "react-icons/hi";

const MyProfile = () => {
    const {user} = useAuth()
    const [greeting, setGreeting] = useState("")

    const time = user?.metadata?.creationTime || null
    useEffect(()=> {
        const currentHour = new Date().getHours();
        if (currentHour < 5) return setGreeting("Good Night");
        if (currentHour < 12) return setGreeting("Good Morning");
        if (currentHour < 18) return setGreeting("Good Afternoon");
        return setGreeting("Good Evening");

    }, [])
    return (
        <div className="max-w-5xl mx-auto px-4 h-[585px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
                <div className="py-10 px-6 h-full flex flex-col w-full border bg-gray-200 rounded">
                    <div>
                        <img src={user?.photoURL} alt="" className="w-36 h-36 mx-auto rounded-full" />
                    </div>
                    <div className="mt-10 flex-1">
                        <h3 className="ml-4 text-2xl font-semibold my-4">{user?.displayName}</h3>
                        <p className="flex items-center gap-2"><IoCheckmarkDoneOutline /> {user?.emailVerified ? <span className="text-green-600 text-lg font-medium">Email is verified</span>: 
                        <span className="text-orange-600 text-base text-center font-medium">Email is not verified</span>}</p>
                        <p className="flex items-center gap-2"><IoCheckmarkDoneOutline />  <span className="text-green-600 text-lg font-medium">Mobile is Confirmed</span></p>
                    </div>
                    <div>
                        <Link to={"/rooms"}>
                            <button className="px-8 py-3 relative shadow-lg before:absolute flex items-center gap-2
                                before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
                                hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
                                after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
                                after:absolute after:bottom-0 after:right-0 after:w-0 
                                after:h-0 hover:after:w-full hover:after:h-full rounded hover:before:rounded hover:after:rounded border border-primary hover:after:transition-all hover:after:duration-500">
                                <span>Explorer Rooms</span>
                                <span><HiOutlineArrowRight /></span>
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="col-span-2 p-6">
                    <h3 className="ml-4 text-2xl font-semibold my-8 text-secondary-black dark:text-white">Welcome {user?.displayName}, {greeting}</h3>
                    <Link to={""} className="inline-block mx-8">
                        <button className="px-8 py-3 relative shadow-lg before:absolute flex items-center gap-2
                            before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
                            hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
                            after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
                            after:absolute after:bottom-0 after:right-0 after:w-0 
                            after:h-0 hover:after:w-full hover:after:h-full rounded hover:before:rounded hover:after:rounded border border-primary hover:after:transition-all hover:after:duration-500">
                            <span>Edit Profile</span>
                        </button>
                    </Link>
                    <h3 className="text-xl font-semibold my-6">Your Saved Room</h3>
                    <div className="divider"></div>
                    <div>
                        <h3 className="text-2xl text-red-500 my-6 capitalize">You have no saved Room yet</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;