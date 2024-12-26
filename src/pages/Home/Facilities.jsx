
const Facilities = ({facilites}) => {
    return (
        <div data-aos="zoom-in" className="w-full bg-[#f2f8f9] relative overflow-hidden group cursor-pointer rounded-md before:bg-[#DDEBED] before:w-[38px] before:h-[38px] before:absolute before:top-0 before:right-0 before:rounded-bl-[35px] before:z-[-1] hover:before:scale-[38] hover:shadow-md group before:transition-all before:ease-out before:duration-[300ms] z-[0]">
            <div className="p-5 border flex flex-col items-center justify-center text-center gap-2 py-6 rounded-md">
                {/* <p><FaCarOn size={64} className="text-primary"/></p> */}
                <img src={facilites.icon} alt="" />
                <h4 className="text-2xl font-bold my-2 text-secondary-black group-hover:text-primary">{facilites.title}</h4>
                <p className="text-light-black group-hover:text-primary/65">{facilites.des}</p>
            </div>
        </div>
    );
};

export default Facilities;