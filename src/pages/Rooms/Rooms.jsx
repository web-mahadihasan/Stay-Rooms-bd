import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import RoomCard from "../../components/common/RoomCard";
import { Link } from "react-router";
import { FaListUl } from "react-icons/fa6";
import { AiOutlineAppstore } from "react-icons/ai";
import RoomAsideTool from "./RoomAsideTool";

const Rooms = () => {

    const {data:allRooms, isLoading} = useQuery({ queryKey: ['featuredRoom'], queryFn: async() =>  {
        const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/rooms`)
        return data
    } })
    console.log(allRooms)
    if(isLoading) return <LoadingSpinner/>

    return (
        <div className="min-h-screen bg-[#f2f4f8]">
            
            {/* Card  */}
            <div className="max-w-7xl mx-auto px-4 xl:px-0 my-24">
                
                <div className="grid grid-cols-3 gap-6 py-6">
                    <aside className="border col-span-1">
                        <RoomAsideTool/>
                    </aside>
                    <section className="col-span-2">
                        {/* Room Card Grid  */}
                        <div className="mb-4 p-3 rounded-md flex justify-between items-center bg-base-100">
                            <Link to={"/"}><button className="px-5 py-1.5 bg-white text-primary rounded shadow-md border border-primary hover:bg-primary hover:text-white hover:border-primary duration-500 font-medium">Back</button></Link>
                            <div className="flex items-center gap-2">
                                <button><FaListUl size={20} className="text-titleBlack/65"/></button>
                                <button><AiOutlineAppstore size={24} className="text-primary"/></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
                            {
                                allRooms?.map(room =>  <RoomCard key={room._id} roomData = {room}/>)  
                            }
            
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Rooms;