import { Link } from "react-router";
import { motion } from "framer-motion";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useEffect, useState } from "react";

const Slider1 = ({ image, title, subtitle, description}) => {
  const [sliderKey, setSliderKey] = useState(0); 

    
    useEffect(() => {
        const interval = setInterval(() => {
            setSliderKey((prevKey) => prevKey + 1); 
        }, 5000); 

        return () => clearInterval(interval); 
    }, []);

  return (
    <motion.div key={sliderKey}
      initial={{ backgroundSize: "100% 100%" }}
      animate={{ backgroundSize: "120% 120%" }}  
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className='w-full bg-center bg-cover bg-no-repeat h-full rounded-xl'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='rounded-xl flex items-center justify-center w-full h-full bg-gray-900/50'>
        <div className='text-center'>
          <motion.h1 animate={{ y: [-50, 0],  transition: { duration: 1, ease: "linear", } }}
          className='text-3xl max-w-5xl font-bold text-white lg:text-4xl xl:text-[40px]'>
            {title} <br /> <span className="inline-block my-4">{subtitle}</span>
          </motion.h1>
          <motion.p animate={{ y: [40, 0],  transition: { duration: 1, ease: "linear",} }} 
          className="text-white/80 text-lg max-w-2xl text-center mx-auto my-4">{description}</motion.p>
          <br />
          <motion.div animate={{ y: [50, 0],  transition: { duration: 1, ease: "linear",} }} 
          className="flex justify-center">
              <Link to={"/rooms"} className="px-8 bg-base-100 py-3 relative shadow-lg before:absolute flex items-center gap-2
                before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
                hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
                after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
                after:absolute after:bottom-0 after:right-0 after:w-0 
                after:h-0 hover:after:w-full hover:after:h-full rounded hover:before:rounded hover:after:rounded border border-primary hover:after:transition-all hover:after:duration-500">
              <span>Book a Room</span>
              <span><HiOutlineArrowRight /></span>
              </Link>
            </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
export default Slider1;