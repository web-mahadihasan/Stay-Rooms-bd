import RoomCard from "../../components/common/RoomCard";
import Facilities from "./Facilities";
import pickup from "../../assets/images/car.png";
import customer from "../../assets/images/customer-service.png";
import wifi from "../../assets/images/wifi.png";
import laundry from "../../assets/images/laundry-service.png";
import breakfast from "../../assets/images/breakfast.png";
import parking from "../../assets/images/parking.png";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import LeafletMaps from "../../components/common/LeafletMaps";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router";
import LeafletContent from "../../components/common/LeafletContent";
import HomeGallary from "../../components/common/HomeGallary";
import Carousel from "../../components/common/Banner/Carousel";
import OurSuccess from "../../components/common/OurSuccess";
import PromotionCrousel from "../../components/common/PromotionCrousel";
import { useState } from "react";
import UserReviews from "./UserReviews";
import { Helmet } from "react-helmet";
import { PiToolboxThin } from "react-icons/pi";
import Select from 'react-select'
import { TbCategoryPlus } from "react-icons/tb";

const Home = () => {
  const [reviews, setReviews] = useState(false)
  const [sortValue, setSortValue] = useState("")
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate()
  const Allfacilities = [
    {
      icon: pickup,
      title: "Airport Pick-up Service",
      des: "Start your journey stress-free with our reliable airport pick-up service, ensuring a seamless transition from terminal to your comfortable stay.",
    },
    {
      icon: customer,
      title: "Housekeeper Services",
      des: "Enjoy a spotless and inviting environment every day with our attentive housekeeping, committed to your comfort and cleanliness.",
    },
    {
      icon: wifi,
      title: "Wifi & Internet",
      des: "Stay connected with our high-speed Wi-Fi, perfect for work, browsing, or streaming your favorite shows without interruption.",
    },
    {
      icon: laundry,
      title: "Laundry Services",
      des: "Experience convenience with our professional laundry services, keeping your wardrobe fresh and ready for every occasion.",
    },
    {
      icon: breakfast,
      title: "Breakfast in Bed",
      des: "Begin your mornings with indulgence—savor a delicious breakfast delivered right to your bed, crafted for your delight.",
    },
    {
      icon: parking,
      title: "Private Parking Space",
      des: "Rest easy knowing your vehicle is safe and secure with our dedicated private parking space, designed for your peace of mind.",
    },
  ];
  const options = [
    { value: "asc", label: "Sort by Price Ascending" },
    { value: "dsc", label: "Sort by price Descending" },
    { value: "top", label: "Sort by Top Rating" },
    { value: "low", label: "Sort by Low Rating" },
  ];
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      boxShadow: "none", 
      "&:hover": {
        border: "none", 
      },
      background: "transparent",
    }),
  };
  const {
    data: featuredRoom,
    isLoading
  } = useQuery({
    queryKey: ["featuredRoom"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/rooms?limit=6`
      );
      return data;
    },
  });

  const {data:gallaryData} = useQuery({queryKey: ["gallary"], queryFn: async () =>  {
    const {data} = await axios.get("/gallary.json")
    return data
  }})
  const {data:allReviews} = useQuery({queryKey: ["review", reviews], queryFn: async () =>  {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/all-reviews?sort=${reviews ? "asc" : "dsc"}`);
    return data
  }})

  const optionOnChange = (selectedOption) => {
    setSortValue(selectedOption.value);
  };
  const handleSearch = () => {
    console.log(searchValue, sortValue)
    if(searchValue || sortValue){
      navigate("/rooms", {state:{search: searchValue, sort:sortValue}})
    }else{
      navigate()
    }
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Helmet  */}
      <Helmet>
        <title>StayRooms | Book Your Dream Destination Today</title>
        <meta name="description" content="Explore a wide range of luxurious rooms, cozy getaways, and affordable stays. Book your dream destination with ease and enjoy exclusive offers. Trusted by thousands of happy travelers." />
        <meta name="keywords" content="hotel booking, travel destinations, affordable stays, luxurious rooms, vacation packages, best travel deals" />
        <meta name="author" content="https://stay-rooms-bd.web.app" />
      </Helmet>
      {/* Banner */}
      <div className="relative">
        <Carousel />

        <div className="py-4 absolute -bottom-14 z-20 right-5 left-5 max-w-7xl mx-auto px-4">
          <div className="rounded-t-md bg-white/70 w-fit mx-auto h-14 flex items-center justify-center px-8 backdrop-blur-xl">
              <p className="text-xl font-semibold text-primary">Hotel Room</p>
          </div>
          <div className="flex min-h-20 items-center p-3 backdrop-blur-2xl btn-shadow border gap-2 rounded-md bg-white/50 flex-wrap">
              <div className="flex items-center flex-1 gap-1 rounded-md p-3 bg-gray-100">
                  <span className="px-2 border-r border-gray-400"> <PiToolboxThin size={22} className="text-primary"/> </span>
                  <input type="text" onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} name="" id="" className="bg-transparent border-none font-medium outline-none placeholder-primary-dark px-2" placeholder="Room Title"/>
              </div>
              <div className="flex items-center flex-1 gap-1 rounded-md p-1 bg-gray-100 z-20">
                  <span className="px-2 border-r border-gray-300"> <TbCategoryPlus size={22} className="text-primary"/> </span>
                  <Select options={options} onChange={optionOnChange} className="w-full border-none outline-none" styles={customStyles}/>
              </div>
              <div>
                  <button onClick={handleSearch} className="px-6 py-2 bg-primary border border-primary rounded text-white font-medium">Search</button>
              </div>
          </div>
        </div>
      </div>
      {/* Search for home page  */}
        
      {/* Featured Rooms  */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 my-24">
        <div className="my-8 flex justify-between items-center">
          <h3 className="text-xl md:text-2xl font-bold text-primary-black dark:text-white">Explorer Top-rated Featured Rooms</h3>
          <div>
          <Link to={"/rooms"} className="px-8 py-3 relative shadow-lg before:absolute flex items-center gap-2
            before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
            hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
            after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
            after:absolute after:bottom-0 after:right-0 after:w-0 
            after:h-0 hover:after:w-full hover:after:h-full dark:bg-white dark:text-primary-black font-medium rounded hover:before:rounded hover:after:rounded border border-primary hover:after:transition-all hover:after:duration-500">
              <span>Explorer More</span>
              <span><HiOutlineArrowRight /></span>
          </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {featuredRoom?.map((room) => (
            <RoomCard key={room._id} roomData={room} />
          ))}
        </div>
      </section>
      
      {/* Offers and promotion section  */}
      <section className="max-w-7xl mx-auto px-4 my-24 bg-[#f9fbfe] py-6 overflow-x-hidden">
        <h3 data-aos="fade-down" className="text-center font-extrabold text-4xl text-primary-black my-3 dark:text-white">
        Exclusive Offers Promotional Deals
        </h3>
        <div className="my-12">
          <PromotionCrousel/>
        </div>
      </section>
      
      {/* Facilities */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 ">
        <h3 data-aos="zoom-in" className="text-center font-extrabold text-4xl text-primary-black my-3 dark:text-white">
          Hotel Facilities
        </h3>
        <p data-aos="zoom-in" className="text-center text-light-black max-w-2xl mx-auto my-5 mb-10 dark:text-white/80">Experience a variety of thoughtfully designed amenities to ensure your stay is both comfortable and memorable, including swimming pools, fitness centers, exquisite dining options, high-speed Wi-Fi, and personalized services.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Allfacilities.map((facilites, idx) => (
            <Facilities key={idx} facilites={facilites} />
          ))}
        </div>
        <section className="my-16">
          <OurSuccess/>
        </section>
      </section>

      {/* Leaflet maps/Locaions  */}
      <section className="my-24 overflow-x-hidden">
        <h3 className="text-center font-extrabold text-4xl text-primary-black my-3 dark:text-white">
          Our Location - Find Us
        </h3>
        <p className="text-center text-light-black max-w-2xl mx-auto my-5 mb-10 dark:text-white/85">Discover our location with ease and find us effortlessly. We're here to welcome you—plan your visit today!</p>

        <div className="bg-[#f9fbfe] px-8 py-10 grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-8 rounded-md">
          <div data-aos="fade-left">
            <LeafletContent/>
          </div>
          {/* Maps  */}
          <div data-aos="fade-right" className="h-full min-h-[350px]">
              <LeafletMaps  />
          </div>
        </div>
      </section>

        <section className="w-full bg-[#f7f9ec]/35 py-16 bg-cover bg-center bg-no-repeat overflow-x-hidden"
          style={{
            backgroundImage: `url(https://i.ibb.co.com/c8BqM00/add-visa-bg.png)`,
          }}
        >
                <div className="container mx-auto px-4 xl:px-0">
                    <h3 data-aos="fade-up" className="text-2xl md:text-3xl xl:text-4xl font-bold text-primary-black dark:text-white my-4 text-center capitalize">Regards From form Our Customer </h3>
                    <p data-aos="fade-up" className="text-lg text-light-black mb-4 text-center max-w-3xl mx-auto dark:text-white/85"> what our clients have to say about our exceptional services. Honest and insightful reviews from real customers showcase their experiences, satisfaction, and trust in our expertise.</p>
                    
                </div>
                <div className="container mx-auto px-4 xl:px-0">
                  <div className="py-1 flex items-center gap-8 bg-white shadow-md rounded-md px-6 border dark:bg-white">
                    <button onClick={() => setReviews(false)} className={`py-2 text-base font-medium ${reviews===  false ? 'border-b-2 border-primary text-primary': 'border-b-2 border-gray-400 text-light-black'}`}>Lasted Review</button>
                    <button onClick={() => setReviews(true)} className={`border-b-2 py-2 text-base font-medium ${reviews? 'border-b-2 border-primary text-primary': 'border-b-2 border-gray-400 text-light-black'}`}>All Review</button>
                  </div>
                </div>
                    {/* Review Card  */}
                <div className="container mx-auto px-4 xl:px-0 my-10">
                    <UserReviews allReviews={allReviews}/>
                </div>
            
            </section>

      {/* Photo Gallary  */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 my-24 overflow-x-hidden">
        <h3 className="font-extrabold text-4xl text-primary-black my-3 dark:text-white">
          Gallary
        </h3>
        <p className=" text-light-black max-w-2xl my-5 mb-10 dark:text-white/85">Browse our gallery of luxurious rooms, cozy spaces, exclusive offers, and stunning hotel views. Your perfect stay awaits!</p>
        <HomeGallary gallaryData={gallaryData}/>
      </section>

    </div>
  );
};

export default Home;
