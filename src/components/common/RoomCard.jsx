import tv from "../../assets/icons/tv.svg"
import heater from "../../assets/icons/heater.svg"
import saving from "../../assets/icons/saving.svg"
import freeWifi from "../../assets/icons/feeWifi.svg"
import landPhone from "../../assets/icons/landphone.svg"
import { BsArrowRight } from "react-icons/bs"
import { Link } from "react-router"


const RoomCard = ({roomData}) => {
    const {title, price, imgUrl, description, _id} = roomData || {}
    const Extrafacilities = [
        {icon: tv, name: "TV"},
        {icon: heater, name: "Heater"},
        {icon: saving, name: "Saving Safe"},
        {icon: freeWifi, name: "Free Wifi"},
        {icon: landPhone, name: "Phone"},
    ]
    return (
        <div className="rounded-md card-compact bg-base-100 shadow-sm border">
            <div className="relative  overflow-hidden">
            <figure>
                <img
                src={imgUrl}
                alt="Shoes" className="rounded-t-md h-[250px] w-full hover:scale-110 duration-500 cursor-pointer"/>
            </figure>
            </div>
            <div>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p className="line-clamp-2">{description}</p>
                    <div className="flex items-center flex-wrap gap-4 mt-4">
                        {
                            Extrafacilities.map((facilities, idx) =>  
                                <div key={idx} className="flex items-center gap-1">
                                    <img src={facilities.icon} alt="" className="w-4"/>
                                    <p className="text-secondary-black">{facilities.name}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="divider"></div>
                <div className="flex items-center justify-between mb-3 px-3">
                    <div>
                        <p className="text-light-black text-sm">1 Night, 2 Adults</p>
                        <h3 className="flex items-center gap-2">
                            <span className="text-2xl font-extrabold text-primary">$ {price}</span>
                            <span className="">$ 120</span>
                        </h3>
                    </div>
                    <div>
                        <Link to={`/room-details/${_id}`}>                   
                            <button className="px-5 py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2">Book Now <BsArrowRight /> </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;