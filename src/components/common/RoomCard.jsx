import tv from "../../assets/icons/tv.svg"
import heater from "../../assets/icons/heater.svg"
import saving from "../../assets/icons/saving.svg"
import freeWifi from "../../assets/icons/feeWifi.svg"
import landPhone from "../../assets/icons/landphone.svg"
import { BsArrowRight } from "react-icons/bs"
import { Link, useLocation, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import { Rating } from "@smastrom/react-rating"


const RoomCard = ({roomData}) => {
    const {title, price, imgUrl, description, _id, availability, totalReview} = roomData || {}
    const {pathname} = useLocation()
    const [averageReview, setAverageReview] = useState([]);
    const navigate = useNavigate()

    const Extrafacilities = [
        {icon: tv, name: "TV"},
        {icon: heater, name: "Heater"},
        {icon: saving, name: "Saving Safe"},
        {icon: freeWifi, name: "Free Wifi"},
        {icon: landPhone, name: "Phone"},
    ]

    useEffect(()=>  {
            if (totalReview && totalReview.length > 0) {
                const sum = totalReview.reduce((acc, curr) => acc + curr, 0);
                const avg = sum / totalReview.length;
                setAverageReview([avg.toFixed(1)]); 
            } else {
                setAverageReview([]);
            }
    },[totalReview])
    return (
        <Link data-aos="fade-up" to={pathname ===  "/rooms" && `/room-details/${_id}`} className="block">
        <div className="rounded-md grid grid-cols-1 h-full bg-white shadow-sm border hover:shadow-md hover:bg-[#F5F9FF] dark:hover:bg-[#F5F9FF] dark:bg-white">
            <div className="relative  overflow-hidden rounded-t-md">
                <figure className="rounded-t-md">
                    <img
                    src={imgUrl}
                    alt={title} className="rounded-t-md h-[250px] w-full hover:scale-110 duration-500 cursor-pointer"/>
                </figure>
                <p className={`absolute top-0 left-0  p-1 rounded-sm font-medium text-white ${availability? "bg-green-600" : "bg-orange-600"}`}>{availability ? "Available" : "Unavailable"}</p>
            </div>
            <div className="flex flex-col justify-between">
                <div className="px-4 flex-1 flex flex-col">
                    <div className="flex flex-wrap items-center justify-between">
                        <h2 className="text-2xl font-extrabold my-6 text-primary-black tracking-wide">{title}</h2>
                        {
                            averageReview?.length > 0 && <div className="flex items-center mb-4 gap-2"> 
                                <div style={{ maxWidth: 90, width: '100%' }} className="">
                                    <Rating readOnly value={averageReview} key={averageReview} />
                                </div>
                                <h3 className="text-lg font-bold text-secondary-black">{averageReview?.length > 0 && averageReview}</h3>
                            </div>
                        }
                    </div>
                    <p className="line-clamp-2 text-light-black text-base">{description}</p>
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
                <div className="justify-end">
                    <div className="flex items-center justify-between mb-3 px-3">
                        <div>
                            <p className="text-light-black text-sm">1 Night, 2 Adults</p>
                            <h3 className="flex items-center gap-2">
                                <span className="text-2xl font-extrabold text-primary">$ {price}</span>
                                <span className="">$ 120</span>
                            </h3>
                        </div>
                        <div>
                            <Link to={`/room-details/${_id}`} className="px-5 cursor-pointer py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2">Book Now <BsArrowRight /> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* Card content  */}
        </Link>
    );
};

export default RoomCard;



