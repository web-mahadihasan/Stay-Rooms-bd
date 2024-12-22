import { FaCarOn } from "react-icons/fa6";

const Facilities = ({facilites}) => {
    return (
        <div className="p-5 border flex flex-col items-center justify-center text-center gap-2 py-6 rounded-md">
            {/* <p><FaCarOn size={64} className="text-primary"/></p> */}
            <img src={facilites.icon} alt="" />
            <h4 className="text-2xl font-bold my-2 text-secondary-black">{facilites.title}</h4>
            <p className="text-light-black">{facilites.des}</p>
        </div>
    );
};

export default Facilities;