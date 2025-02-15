import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import RoomCard from "../../components/common/RoomCard";
import { Link, useLoaderData } from "react-router";
import { FaListUl } from "react-icons/fa6";
import { AiOutlineAppstore } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Select from 'react-select'
import { HiOutlineArrowLeft } from "react-icons/hi";
import PriceRange from "./PriceRange";
import RoomCardTableView from "../../components/common/RoomCardTableView";
import { Helmet } from "react-helmet";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import PageTitleSection from "../../components/common/PageTitleSection";
import FAQ from "../RoomDetails/FAQ";

const Rooms = () => {
    const [searchText, setSearchText] = useState("")
    const location = useLocation()
    const faq = useLoaderData()
    const [selectedValue, setSelectedValue] = useState(null);
    const [priceRange, setPriceRange] = useState(null)
    const [tableView, setTableView] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    console.log(location)
    useEffect(()=>{
        if(location.state){
            setSearchText(location.state.search)
        }
        if(location.state){
            setSelectedValue(location.state.sort)
        }
    },[location.state.search, location.state.sort])
    const options = [
        { value: "asc", label: "Sort by Price Ascending" },
        { value: "dsc", label: "Sort by price Descending" },
        { value: "top", label: "Sort by Top Rating" },
        { value: "low", label: "Sort by Low Rating" },
      ];
      const optionOnChange = (selectedOption) => {
        setSelectedValue(selectedOption.value);
      };
    //   Loaded data with query 
    const {data:count} = useQuery({queryKey: ['count'], queryFn: async () =>  {
        const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/rooms`)
        return data
    }})
    
    const {data:allRooms, isLoading} = useQuery({ queryKey: ['featuredRoom', searchText, selectedValue, priceRange, currentPage], queryFn: async() =>  {
        const {data} = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/all-rooms?search=${searchText}&sort=${selectedValue}&range=${priceRange}&page=${currentPage}&size=${itemsPerPage}`
        )
        return data
    } })

    // Pagination 
    const itemsPerPage = 6;
    const numberOfPage = Math.ceil(count?.length/itemsPerPage) || 2;
    const pages = [...Array(numberOfPage).keys()]

    const handlePrevPage = () =>  {
        if(currentPage > 0) {
            setCurrentPage(currentPage - 1 )
        }
    }
    const handleNextPage = () =>  {
        if(currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1 )
        }
    }
    // console.log(priceRange)
    if(isLoading) return <LoadingSpinner/>

    return (
        <div className="min-h-screen bg-[#f2f4f8] dark:bg-secondary-black">
            {/* Helmet  */}
            <Helmet>
                <title>StayRooms | All Rooms </title>
                <meta name="description" content="Browse through our selection of premium rooms designed to suit every traveler's needs. From luxurious suites to cozy budget-friendly options, book your ideal stay today." />
                <meta name="keywords" content="hotel booking, travel destinations, affordable stays, luxurious rooms, vacation packages, best travel deals" />
                <meta name="author" content="https://stay-rooms-bd.web.app" />
            </Helmet>
            {/* Card  */}
            <div>
                <PageTitleSection title={"All Rooms - Explore Our Spaces"} path={"all available rooms"}/>
            </div>
            <div className="max-w-7xl mx-auto px-4 xl:px-0 py-10">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
                    <aside className="col-span-1 md:col-span-2 lg:col-span-1">
                        {/* Tool Bar  */}
                        <div className={`w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6 lg:space-y-4"}`}>
                            <div className="p-6 rounded w-full bg-white border border-gray-100  shadow dark:shadow-md">
                                <h3 className="text-lg font-medium  text-secondary-black ">Search by Title</h3>
                                <div className="divider my-3"></div>
                                <div className="relative my-2">
                                    <input onBlur={(e) =>  setSearchText(e.target.value)}
                                    id="search" type="search" name="search" placeholder="Search here" aria-label="Search content"
                                    className="peer relative h-12 w-full rounded border border-slate-200 px-4 pr-12 text-slate-500 outline-none transition-all bg-white dark:bg-white autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-primary/50 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" />
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" aria-label="Search icon"
                                    role="graphics-symbol">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                    </svg>
                                </div>
                                <button className="px-5 mt-4 py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2 font-medium tracking-wide">Search </button>
                            </div>
                            <div className="p-6 lg:my-0 lg:flex-1 bg-white border border-gray-100 rounded ">
                                <h3 className="text-lg font-medium  text-secondary-black ">Filter by Room Availablity</h3>
                                <div className="divider my-3"></div>
                                <div>
                                <div className={` text-lg flex gap-1 flex-wrap xl:flex-col xl:flex-nowrap`}>
                                    <div className="cursor-pointer my-4 space-y-4">
                                        <label className="flex gap-2 items-center">
                                            <input type="checkbox" className="checkbox checkbox-info" />
                                            <span className="label-text text-secondary-black ">Available Room</span>
                                        </label>
                                        <label className="flex gap-2 items-center">
                                            <input type="checkbox" className="checkbox checkbox-info" />
                                            <span className="label-text text-secondary-black ">Featured Room</span>
                                        </label>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                            <div className="p-6 h-full lg:my-0 lg:flex-1 bg-white border border-gray-100 rounded min-h-52">
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
                            <div className="p-6 h-full lg:my-0 lg:flex-1 bg-white border border-gray-100 rounded min-h-52">
                                <div>
                                    <label className="block text-lg font-medium  text-secondary-black my-2">
                                    Sort By Price/Rating
                                    </label>
                                </div>
                                <div className="divider my-3"></div>
                                <div className="max-w-full">
                                    <PriceRange setPriceRange={setPriceRange}/>
                                </div>
                            </div>
                           
                        </div>
                    </aside>
                    <section className="col-span-2">
                        {/* Room Card Grid  */}
                        <div className="mb-4 p-3 rounded-md flex justify-between items-center bg-white text-secondary-black">
                            <Link to={"/"}>
                                <button className="px-8 py-3 relative shadow-lg before:absolute flex items-center gap-2
                                    before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
                                    hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
                                    after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
                                    after:absolute after:bottom-0 after:right-0 after:w-0 
                                    after:h-0 hover:after:w-full hover:after:h-full rounded hover:before:rounded hover:after:rounded border border-primary hover:after:transition-all hover:after:duration-500">
                                    <span><HiOutlineArrowLeft /></span>
                                    <span>Back</span>
                                </button>
                            </Link>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setTableView(true)}><FaListUl size={20} className={`${tableView? "text-primary": "text-light-black"}`}/></button>
                                <button onClick={() => setTableView(false)}><AiOutlineAppstore size={24} className={`${!tableView? "text-primary": "text-light-black"}`}/></button>
                            </div>
                        </div>
                        {
                            tableView ? <div className="grid grid-cols-1 gap-7">
                            {
                               allRooms.length > 0 ? allRooms?.map(room =>  <RoomCardTableView key={room._id} roomData = {room}/>)
                               : <h3 className="text-3xl font-semibold col-span-2 text-red-500 my-6">No Rooms found in your query</h3>  
                            }
            
                        </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7">
                            {
                               allRooms.length > 0 ? allRooms?.map(room =>  <RoomCard key={room._id} roomData = {room}/>)
                               : <h3 className="text-3xl font-semibold col-span-2 text-red-500 my-6">No Rooms found in your query</h3>  
                            }
            
                        </div>
                        }
                        {/* Pagination  */}
                        <div className="flex justify-center items-center my-10 gap-4">
                            <button onClick={handlePrevPage} className="flex items-center gap-2 bg-primary text-white py-1.5 px-4 font-medium rounded hover:bg-secondary-black duration-300 dark:hover:bg-white dark:hover:text-secondary-black"><BsArrowLeft /> Prev</button>
                            <div className="flex items-center gap-4">
                                {
                                    pages?.map(page =>  <button onClick={() => setCurrentPage(page) } key={page} className={`px-4 py-1 hover:bg-blue-700 duration-300 rounded text-white font-semibold ${currentPage ===  page? "bg-primary": "bg-gray-400"}`}>
                                            {page+1}
                                        </button>)
                                }
                            </div>
                            <button onClick={handleNextPage} className="flex items-center gap-2 bg-primary text-white py-1.5 px-4 font-medium rounded hover:bg-secondary-black duration-300 dark:hover:bg-white dark:hover:text-secondary-black">Next <BsArrowRight /> </button>
                        </div>
                        
                    </section>
                    <div className="w-full col-span-3">
                        {/* <h3></h3> */}
                        <div className="w-full">
                            <FAQ faqData={faq} title={"Some freequently asked question get from our user when booking room"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rooms;