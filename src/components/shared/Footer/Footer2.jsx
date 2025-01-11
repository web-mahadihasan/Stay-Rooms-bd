import {IoLocationOutline} from "react-icons/io5";
import {MdOutlineEmail, MdOutlineLocalPhone} from "react-icons/md";
import logo from '../../../assets/images/stayroom.png'
import { motion } from "framer-motion";
import { Link } from "react-router";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useState } from "react";
import toast from "react-hot-toast";

const Footer = () => {

    const [newsLetterEmail, setNewsLetterEmail] = useState("")

    const handleNewsLetter =() =>  {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const checkEmail = emailRegex.test(newsLetterEmail)
        if(!checkEmail){
            toast.error("Email is invalid! Enter a valid email")
        }else{
            toast.success("Successfully subscribe as a Newsletter")
            setNewsLetterEmail("")
        }
    }
    return (
        <motion.footer
        initial={{ backgroundSize: "100% 100%" }}
        animate={{ backgroundSize: "120% 120%" }}  
        transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
        }}
            className="boxShadow text-white w-full p-6 lg:p-9 bg-cover"
            style={{
                backgroundImage: `url('https://i.ibb.co/fSQws4p/footer.png')`,
            }}
            >
            <div className="flex justify-between gap-[30px] flex-wrap max-w-7xl pt-14 mx-auto px-4 xl:px-0">

                <div className="w-full sm:w-[25%] ">
                    <img src={logo} alt="logo"
                        className="w-[150px] mb-[20px]"/>
                    <div className="flex flex-col gap-[20px] text-white/85">
                        <span><a
                            className="text-[0.9rem] flex items-center gap-[8px] cursor-pointer">
                            <IoLocationOutline className="text-[1.2rem]"/>
                                5 Ave lalbagh mor, Rangpur, Bangladesh
                        </a></span>
                        <span><a className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                            <MdOutlineEmail className="text-[1.1rem]"/>
                                mehedihasanmilu7@gmail.com
                            </a></span>
                        <span><a
                            className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                            <MdOutlineLocalPhone className="text-[1.1rem]"/>
                            +8801794943980
                        </a></span>
                    </div>
                </div>

                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Company</h3>
                    <div className="flex text-white/85 flex-col gap-[10px]">
                        <Link to={"/rooms"} className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Rooms</Link>
                        <Link to={"/my-booking"} className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">My Booking</Link>
                        <Link to={"/about-us"} className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Our Team</Link>
                        <Link to={"/about-us"} className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">About us</Link>
                        <Link className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Blog</Link>
                        <Link to={"/contact-us"} className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Contact
                            Us</Link>
                    </div>
                </div>  
                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Our Social Media</h3>
                    <div className="flex text-white/85 flex-col gap-[10px]">
                        <p className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Dribbble</p>
                        <p className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Behance</p>
                        <p className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Medium</p>
                        <p className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Instagram</p>
                        <p className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Facebook</p>
                        <p className="text-[0.9rem] text-text hover:text-white/85 cursor-pointer transition-all duration-200">Twitter</p>
                    </div>
                </div>  
                <div className="">
                    <h3 className="text-[1.2rem] font-semibold text-text mb-2">Join a
                        Newsletter</h3>
                    <div className="flex space-y-4 gap-[2px] flex-col text-text relative">
                        <label className="text-[0.9rem]">Your Email</label>
                        <div className="flex border border-primary rounded-md">
                            <input onChange={(e) =>  setNewsLetterEmail(e.target.value)} value={newsLetterEmail} type="email"
                                className="py-3 px-4 w-full flex-1 pr-[90px] rounded-md  outline-none"
                                placeholder="Email address"/>    
                            <button onClick={handleNewsLetter}
                                className="py-3 px-4  bg-primary text-white">Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="border-t border-gray-200 pt-[20px] mt-[40px] flex items-center justify-between w-full flex-wrap gap-[20px]">
                <img src={logo} alt="logo"
                     className="h-10"/>

                <p className="text-[0.9rem] text-gray-600">© 2024 StayRooms. All Rights
                    Reserved. </p>

                <div className="flex items-center gap-[10px] text-text">
                    <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-primary transition-all duration-300">
                        <BsFacebook/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-primary transition-all duration-300">
                        <BsTwitter/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-primary transition-all duration-300">
                        <BsInstagram/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-primary transition-all duration-300">
                        <BsLinkedin/>
                    </a>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
                    