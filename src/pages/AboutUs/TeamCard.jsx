import {FaXTwitter} from "react-icons/fa6";
import {ImFacebook2} from "react-icons/im";
import {FaDribbble} from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";

const TeamCard = ({img, name, title}) => {
    return (
        <div className="relative group overflow-hidden rounded">
{/*  image  */}
                    <img
                        src={img}
                        alt="animated_card"
                        className="w-full h-[350px] rounded object-cover group-hover:scale-[1.1] transition-all duration-700"/>

                    {/*  text  */}
                    <div
                        className="absolute top-[50%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col">
                         <h1 className="text-3xl text-white text-center capitalize  font-bold tracking-[1px] leading-[30px] ">{name}</h1>
                        <p className="text-[1rem] text-white translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">{title}</p>
                            <div className="flex items-center gap-[20px] mt-[15px]">
                        <div
                            className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                            <ImFacebook2
                                className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                        </div>
                        <div
                            className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[800ms] opacity-0 group-hover:opacity-100">
                            <FaXTwitter
                                className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                        </div>
                        <div
                            className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[1100ms] opacity-0 group-hover:opacity-100">
                            <BsLinkedin
                                className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                        </div>
                    </div>
                    </div>

                    {/*  bottom shadow  */}
                    <div
                        className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.01)] to-[rgb(0,0,0,0.5)] h-[100%] absolute bottom-0 left-0 right-0">
                    </div>
        </div>
    );
};

export default TeamCard;