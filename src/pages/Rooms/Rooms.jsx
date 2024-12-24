import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import RoomCard from "../../components/common/RoomCard";
import { Link } from "react-router";
import { FaListUl } from "react-icons/fa6";
import { AiOutlineAppstore } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Select from 'react-select'

const Rooms = () => {
    const [searchText, setSearchText] = useState("")
    const {pathname} = useLocation()
    const [selectedValue, setSelectedValue] = useState(null);
    // const [isLoading, setIsLoading] = useState(false)
    // const [allRooms, setAllRooms] = useState([])

    const options = [
        { value: "asc", label: "Sort by Price Ascending" },
        { value: "dsc", label: "Sort by price Descending" },
      ];
      const optionOnChange = (selectedOption) => {
        setSelectedValue(selectedOption.value);
      };

    //   useEffect(()=>  {
    //     const getRoom =  async() =>  {
    //         const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/all-rooms?search=${searchText}`)
    //         setAllRooms(data)
    //     }
    //     getRoom()
    //   }, [searchText])
    const {data:allRooms, isLoading} = useQuery({ queryKey: ['featuredRoom', searchText, selectedValue], queryFn: async() =>  {
        const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/all-rooms?search=${searchText}&sort=${selectedValue}`)
        return data
    } })

    if(isLoading) return <LoadingSpinner/>

    return (
        <div className="min-h-screen bg-[#f2f4f8]">
            
            {/* Card  */}
            <div className="max-w-7xl mx-auto px-4 xl:px-0 my-24">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                    <aside className="col-span-1 md:col-span-2 lg:col-span-1">
                        {/* Tool Bar  */}
                        <div className={`w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 lg:space-y-4"}`}>
                            <div className="p-6 rounded w-full bg-base-100 border border-gray-100">
                                <h3 className="text-lg font-medium  text-secondary-black">Search by Title</h3>
                                <div className="divider my-3"></div>
                                <div className="relative my-2">
                                    <input onBlur={(e) =>  setSearchText(e.target.value)}
                                    id="search" type="search" name="search" placeholder="Search here" aria-label="Search content"
                                    className="peer relative h-12 w-full rounded border border-slate-200 px-4 pr-12 text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-primary/50 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" aria-label="Search icon"
                                    role="graphics-symbol">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <button className="px-5 mt-4 py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2 font-medium tracking-wide">Search </button>
                            </div>
                            <div className="p-6 lg:my-0 lg:flex-1 bg-base-100 border border-gray-100 rounded">
                                <h3 className="text-lg font-medium  text-secondary-black">Filter by Room Availablity</h3>
                                <div className="divider my-3"></div>
                                <div>
                                <div className={` text-lg ${pathname ===  "/all-visa"? "flex flex-wrap": "flex gap-1 flex-wrap xl:flex-col xl:flex-nowrap"}`}>
                                    <div className="cursor-pointer my-4 space-y-4">
                                        <label className="flex gap-2 items-center">
                                            <input type="checkbox" className="checkbox checkbox-info" />
                                            <span className="label-text">Available Room</span>
                                        </label>
                                        <label className="flex gap-2 items-center">
                                            <input type="checkbox" className="checkbox checkbox-info" />
                                            <span className="label-text">Featured Room</span>
                                        </label>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="p-6 h-full lg:my-0 lg:flex-1 bg-base-100 border border-gray-100 rounded min-h-52">
                                <div>
                                    <label className="block text-lg font-medium  text-secondary-black my-2">
                                    Sort By Price/Rating
                                    </label>
                                    <div className="divider my-3"></div>
                                    <Select
                                    options={options}
                                    name="visaType"
                                    onChange={optionOnChange}
                                    placeholder="Sort Type"
                                    />
                                </div>
                            </div>
                        </div>
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
                               allRooms.length > 0 ? allRooms?.map(room =>  <RoomCard key={room._id} roomData = {room}/>)
                               : <h3 className="text-3xl font-semibold col-span-2 text-red-500 my-6">No Rooms found in your query</h3>  
                            }
            
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Rooms;