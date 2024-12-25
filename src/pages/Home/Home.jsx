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
import { Link } from "react-router";
import LeafletContent from "../../components/common/LeafletContent";
import HomeGallary from "../../components/common/HomeGallary";
import Carousel from "../../components/common/Banner/Carousel";
import OurSuccess from "../../components/common/OurSuccess";
import Promotions from "../../components/common/Promotions";

const Home = () => {
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

  const {
    data: featuredRoom,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["featuredRoom"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/rooms`
      );
      return data;
    },
  });

  const {data:gallaryData} = useQuery({queryKey: ["gallary"], queryFn: async () =>  {
    const {data} = await axios.get("/gallary.json")
    return data
  }})

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Banner */}
      <div>
        <Carousel />
      </div>

      {/* Featured Rooms  */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 my-24">
        <div className="my-8 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-primary-black">Explorer Top-rated Featured Rooms</h3>
          <div>
          <Link to={"/rooms"} className="px-8 py-3 relative shadow-lg before:absolute flex items-center gap-2
            before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
            hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
            after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
            after:absolute after:bottom-0 after:right-0 after:w-0 
            after:h-0 hover:after:w-full hover:after:h-full rounded hover:before:rounded hover:after:rounded border border-primary hover:after:transition-all hover:after:duration-500">
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
      <section className="my-24 bg-[#f9fbfe] py-6">
        <h3 className="text-center font-extrabold text-4xl text-primary-black my-3">
        Exclusive Offers Promotional Deals
        </h3>
        <div className="my-12">
          <Promotions/>
        </div>
      </section>
      
      {/* Facilities */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 ">
        <h3 className="text-center font-extrabold text-4xl text-primary-black my-3">
          Hotel Facilities
        </h3>
        <p className="text-center text-light-black max-w-2xl mx-auto my-5 mb-10">Experience a variety of thoughtfully designed amenities to ensure your stay is both comfortable and memorable, including swimming pools, fitness centers, exquisite dining options, high-speed Wi-Fi, and personalized services.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Allfacilities.map((facilites, idx) => (
            <Facilities key={idx} facilites={facilites} />
          ))}
          {/* <Facilities/> */}
        </div>
        {/* our success  */}
        <section className="my-16">
          <OurSuccess/>
        </section>
      </section>

      {/* Leaflet maps/Locaions  */}
      <section className="my-24">
        <h3 className="text-center font-extrabold text-4xl text-primary-black my-3">
          Our Location - Find Us
        </h3>
        <p className="text-center text-light-black max-w-2xl mx-auto my-5 mb-10">Discover our location with ease and find us effortlessly. We're here to welcome you—plan your visit today!</p>

        <div className="bg-[#f9fbfe] px-8 py-10 grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto gap-8">
          <div>
            <LeafletContent/>
          </div>
          {/* Maps  */}
          <div className="h-full min-h-[350px]">
              <LeafletMaps  />
          </div>
        </div>
      </section>
        {/* User Review  */}
        <section>
          
        </section>
      {/* Photo Gallary  */}
      <section className="max-w-7xl mx-auto px-4 xl:px-0 my-24">
        <h3 className="font-extrabold text-4xl text-primary-black my-3">
          Gallary
        </h3>
        <p className=" text-light-black max-w-2xl my-5 mb-10">Browse our gallery of luxurious rooms, cozy spaces, exclusive offers, and stunning hotel views. Your perfect stay awaits!</p>
        <HomeGallary gallaryData={gallaryData}/>
      </section>

    </div>
  );
};

export default Home;
