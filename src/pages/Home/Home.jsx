import Carousel from "../../components/common/Banner/Carousel";
import RoomCard from "../../components/common/RoomCard";
import Facilities from "./Facilities";
import pickup from "../../assets/images/car.png"
import customer from "../../assets/images/customer-service.png"
import wifi from "../../assets/images/wifi.png"
import laundry from "../../assets/images/laundry-service.png"
import breakfast from "../../assets/images/breakfast.png"
import parking from "../../assets/images/parking.png"
import axios from "axios";
import {useQuery} from '@tanstack/react-query'
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Home = () => {
    const Allfacilities = [
        {icon: pickup, title: "Airport Pick-up Service", des: "Start your journey stress-free with our reliable airport pick-up service, ensuring a seamless transition from terminal to your comfortable stay."},
        {icon: customer, title: "Housekeeper Services", des: "Enjoy a spotless and inviting environment every day with our attentive housekeeping, committed to your comfort and cleanliness."},
        {icon: wifi, title: "Wifi & Internet", des: "Stay connected with our high-speed Wi-Fi, perfect for work, browsing, or streaming your favorite shows without interruption."},
        {icon: laundry, title: "Laundry Services", des: "Experience convenience with our professional laundry services, keeping your wardrobe fresh and ready for every occasion."},
        {icon: breakfast, title: "Breakfast in Bed", des: "Begin your mornings with indulgence—savor a delicious breakfast delivered right to your bed, crafted for your delight."},
        {icon: parking, title: "Private Parking Space", des: "Rest easy knowing your vehicle is safe and secure with our dedicated private parking space, designed for your peace of mind."},
    ]

    const {data:featuredRoom, isLoading, isPending} = useQuery({ queryKey: ['featuredRoom'], queryFn: async() =>  {
        const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/rooms`)
        return data
    } })

    if(isLoading) return <LoadingSpinner/>

    return (
        <div>
            {/* Banner */}
            <div>
                <Carousel/>
            </div>

            {/* Featured Rooms  */}
            <div className="max-w-7xl mx-auto px-4 xl:px-0 my-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {
                      featuredRoom?.map(room =>  <RoomCard key={room._id} roomData = {room}/>)  
                    }
      
                </div>
            </div>

            {/* Facilities */}
            <div>
                <h3 className="text-center font-extrabold text-4xl text-primary-black my-3">Hotel Facilities</h3>
                <div className="max-w-7xl mx-auto px-4 xl:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {
                        Allfacilities.map((facilites, idx) =>  <Facilities key={idx} facilites={facilites}/>)
                    }
                    {/* <Facilities/> */}
                </div>
            </div>
        </div>
    );
};

export default Home;