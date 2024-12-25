import {  HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router";
import room from "../../assets/icons/room.svg"
import price from "../../assets/icons/competitive.svg"
import booking from "../../assets/icons/fastBook.svg"
import rating from "../../assets/icons/hotelRating.svg"
import support from "../../assets/icons/support.svg"
import flexibility from "../../assets/icons/flexibility.svg"
import OurSuccess from "../../components/common/OurSuccess";
import TeamCard from "./TeamCard";
import { Helmet } from "react-helmet";

const About = () => {
    const WhyChoose = [
        {title: "Extensive Room Options", description: "Best hotels available for different destinations to offer you the stay of a lifetime.", icon: room},
        {title: "Competitive Pricing", description: "Enjoy hotel bookings with the best offers and discounts and make your stay unforgettable.", icon: price},
        {title: "Fast Booking", description: "Book hotels quickly with exclusive offers and discounts to make your stay truly memorable.", icon: booking},
        {title: "Hotel Ratings", description: "All our hotels have good ratings on Trip Advisor and are recommended by users.", icon: rating},
        {title: "Best Support 24/7", description: "Enjoy 24/7 expert assistance for all your bookings and make your experience truly stress-free.", icon: support},
        {title: "Ultimate Flexibility", description: "Enjoy ultimate flexibility with easy booking changes and cancellations for a hassle-free stay.", icon: flexibility},
    ]
    return (
        <div>
            {/* Helmet  */}
            <Helmet>
                <title>StayRooms | About us </title>
                <meta name="description" content="Browse through our selection of premium rooms designed to suit every traveler's needs. From luxurious suites to cozy budget-friendly options, book your ideal stay today." />
                <meta name="keywords" content="hotel booking, travel destinations, affordable stays, luxurious rooms, vacation packages, best travel deals" />
                <meta name="author" content="https://stay-rooms-bd.web.app" />
            </Helmet>
            {/* About  */}
            <section className="max-w-7xl mx-auto px-4 xl:px-0">
            <section className="bg-base-100 shadow-md border border-gray-100 gap-6 my-24 flex flex-col lg:flex-row items-center justify-between rounded-md">
                <div className="flex-1 h-full">
                    <img src="https://i.ibb.co.com/7tmP5qk/luxury-hotel.jpg" alt="About bg"className="rounded-md h-full min-h-[470px] w-full" />
                </div>
                <div className="flex-1 py-8 px-4">
                    <h3 className="text-3xl my-6 font-bold ">About Us</h3>
                    <p className="text-lg mb-4 text-light-black leading-8">
                    Welcome to StayRooms, your trusted partner for hassle-free hotel room bookings. We specialize in connecting travelers with their perfect stay, offering a seamless, secure, and personalized booking experience.
                    <br />
                    Our mission is to make every journey memorable by providing access to a wide variety of accommodations, from luxurious resorts to budget-friendly stays. With a focus on quality and customer satisfaction, we strive to deliver comfort, convenience, and confidence at every step of your travel journey.
                    </p>
                    <Link to={"/rooms"}>
                        <button className="px-8 py-3 relative shadow-lg before:absolute flex items-center gap-2
                            before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
                            hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
                            after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
                            after:absolute after:bottom-0 after:right-0 after:w-0 
                            after:h-0 hover:after:w-full hover:after:h-full rounded hover:before:rounded hover:after:rounded border border-primary hover:after:transition-all hover:after:duration-500">
                            <span>Book Now</span>
                            <span><HiOutlineArrowRight /></span>
                        </button>
                    </Link>
                </div>
            </section>

            {/* our success  */}
            <section>
                <OurSuccess/>
            </section>
            {/* Why chooose us  */}
                <section className="my-24">
                    <h3 className="text-2xl md:text-3xl font-bold text-primary-black text-center my-10">Why Book Hotels with StayRooms?</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            WhyChoose.map((choose, idx) =>  <div key={idx} className="flex p-4 items-center gap-2 border border-[#cce9ff] why-card-shadow cursor-pointer rounded-md hover:-translate-y-2 duration-300">
                                <div className="min-w-[80px] bg-[#cce9ff] p-4 rounded-full">
                                    <img src={choose.icon} alt="" className="mx-auto" />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-secondary-black my-2">{choose.title}</h4>
                                    <p className="text-light-black text-base">{choose.description}</p>
                                </div>
                            </div>)
                        }
                    </div>
                </section>

                {/* Our Team section  */}
                <section className="my-24">
                <h3 className="text-2xl md:text-3xl font-bold text-primary-black  my-14">Meet Our Expert Team</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                        <TeamCard name={"Mehedi Hasan"} title={"CEO"} img={"https://i.ibb.co.com/NZm1B4x/1618911604887-1.jpg"}/>
                        <TeamCard name={"David Carter"} title={"Managing Director"} img={"https://i.ibb.co.com/c8mWGpH/profile-img-2.jpg"}/>
                        <TeamCard name={"John Miller"} title={"Chief Marketing, CMO"} img={"https://i.ibb.co.com/N6mQY6G/profile-img-3.jpg"}/>
                        <TeamCard name={"Emily Rodriguez"} title={"Head Of Booking"} img={"https://i.ibb.co.com/tDgK4G2/profile-img.jpg"}/>
                    </div>
                </section>
            </section>
            <div>
                
            </div>
        </div>
    );
};

export default About;