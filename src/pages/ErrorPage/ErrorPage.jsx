import Lottie from "lottie-react";
import img from "../../assets/lottie/404.json"
import { Link, useRouteError } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";
import { motion, reverseEasing } from "framer-motion";

const ErrorPage = () => {

    const {error} = useRouteError()
    console.log(error)
    
    return (
        <div className="w-full max-h-screen flex items-center justify-center flex-col">
            <motion.div animate={{ y: [-10, 0, 10],  transition: { duration: 2, ease: "linear", repeat: Infinity, repeatType: "reverse",} }}
            className="h-[700px]">
                <Lottie animationData={img} className="h-full"/>                
            </motion.div>
            <div className="flex flex-col">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-black">Page not found</h3>
                <div className="my-8 flex gap-6">
                    <Link to={-1}>                   
                        <button className="px-5 font-medium capitalize py-3 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2"><BsArrowLeft /> Go Back  </button>
                    </Link>
                    <Link to={"/"}>
                        <button className="px-8 py-3 relative shadow-lg before:absolute flex items-center gap-2
                            before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
                            hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
                            after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
                            after:absolute after:bottom-0 after:right-0 after:w-0 
                            after:h-0 hover:after:w-full hover:after:h-full rounded hover:before:rounded hover:after:rounded border border-primary hover:after:transition-all hover:after:duration-500">
                            <span className="font-medium capitalize">Back to home</span>
                            <span><HiOutlineArrowRight /></span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;