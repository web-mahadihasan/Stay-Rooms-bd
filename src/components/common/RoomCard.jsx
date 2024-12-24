import tv from "../../assets/icons/tv.svg"
import heater from "../../assets/icons/heater.svg"
import saving from "../../assets/icons/saving.svg"
import freeWifi from "../../assets/icons/feeWifi.svg"
import landPhone from "../../assets/icons/landphone.svg"
import { BsArrowRight } from "react-icons/bs"
import { Link, useLocation } from "react-router"
import { useRef, useState } from "react"


const RoomCard = ({roomData}) => {
    const {title, price, imgUrl, description, _id, availability} = roomData || {}
    const {pathname} = useLocation()

    const Extrafacilities = [
        {icon: tv, name: "TV"},
        {icon: heater, name: "Heater"},
        {icon: saving, name: "Saving Safe"},
        {icon: freeWifi, name: "Free Wifi"},
        {icon: landPhone, name: "Phone"},
    ]

    return (
        <Link to={pathname ===   '/rooms' && `/room-details/${_id}`}>
        <div className="rounded-md card-compact bg-base-100 shadow-sm border hover:shadow-md hover:bg-[#F5F9FF]">
            <div className="relative  overflow-hidden rounded-t-md">
                <figure className="rounded-t-md">
                    <img
                    src={imgUrl}
                    alt={title} className="rounded-t-md h-[250px] w-full hover:scale-110 duration-500 cursor-pointer"/>
                </figure>
                <p className={`absolute top-0 left-0  p-1 rounded-sm font-medium text-white ${availability? "bg-green-600" : "bg-orange-600"}`}>{availability ? "Available" : "Unavailable"}</p>
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
        {/* Card content  */}
        </Link>
    );
};

export default RoomCard;