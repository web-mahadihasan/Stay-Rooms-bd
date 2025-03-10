import tv from "../../assets/icons/tv.svg"
import heater from "../../assets/icons/heater.svg"
import saving from "../../assets/icons/saving.svg"
import freeWifi from "../../assets/icons/feeWifi.svg"
import landPhone from "../../assets/icons/landphone.svg"
import aircondition from "../../assets/icons/airCondition.svg"
import { useLoaderData, useNavigate, useParams } from "react-router"
import FAQ from "./FAQ"
import { BsArrowUpRightCircle } from "react-icons/bs"
import { RiCloseLargeLine } from "react-icons/ri"
import RoomBookModal from "./RoomBookModal"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import check from "../../assets/icons/check.svg"
import { format } from "date-fns"
import useAuth from "../../hooks/useAuth"
import useAxiosSecured from "../../hooks/useAxiosSecured"
import { useMutation, useQuery } from "@tanstack/react-query"
import LoadingSpinner from "../../components/common/LoadingSpinner"
import Swal from "sweetalert2"
import { IoCalendarOutline } from "react-icons/io5"
import Select from 'react-select'
import { Rating } from "@smastrom/react-rating"
import LeafletMaps from "../../components/common/LeafletMaps"
import { Helmet } from "react-helmet"
import PageTitleSection from "../../components/common/PageTitleSection"

const RoomDetails = () => {
    const {user} = useAuth()
    const faq = useLoaderData()
    const modalRef = useRef();
    const {id} = useParams()
    const axiosSecured = useAxiosSecured()
    const navigate = useNavigate()
    const [selectedValue, setSelectedValue] = useState(null);
    const [averageReview, setAverageReview] = useState([]);
    
    const options = [
        { value: "top", label: "Top Rating" },
        { value: "low", label: "Low Rating" },
        { value: "asc", label: "Date Ascending" },
        { value: "dsc", label: "Date Descending" },
      ];
    const highlightFacilities = [
        {icon: tv, name: "TV"},
        {icon: heater, name: "Heater"},
        {icon: aircondition, name: "Air Condition"},
        {icon: saving, name: "Saving Safe"},
        {icon: freeWifi, name: "Free Wifi"},
        {icon: landPhone, name: "Phone"},
    ]
    const optionOnChange = (selectedOption) => {
        setSelectedValue(selectedOption.value);
      };
    
    // Room Details data 
    const {data:detailsData, isLoading} = useQuery({ queryKey: ['roomDetails'], queryFn: async() =>  {
        const {data} = await axiosSecured.get(`/api/rooms/${id}`)
        return data
    } })
    const {title, price, imgUrl, description,facilities, _id, availability, totalReview} = detailsData || {}

    const {data:reviewData} = useQuery({queryKey: ['reviewData',_id, selectedValue], queryFn: async () =>  {
        const {data} = await axiosSecured.get(`/rooms-review/${_id}?sort=${selectedValue}`)
        return data;  
    },
    enabled: !!_id,
    })
    console.log(selectedValue)
    useEffect(()=>  {
        if (totalReview && totalReview.length > 0) {
            const sum = totalReview.reduce((acc, curr) => acc + curr, 0);
            const avg = sum / totalReview.length;
            setAverageReview([avg.toFixed(1)]); 
        } else {
            setAverageReview([]);
        }
    },[totalReview])
    
    // Book room 
    const {isPending ,mutateAsync} = useMutation({
        mutationFn: async bookingData =>  {
            await axiosSecured.post(`/booking`, bookingData)
        },
        onSuccess: () =>  {
            modalRef.current.close()
            Swal.fire({
                title: "Success!",
                icon: "success",
                draggable: true,
                text: "Successfully Booked this room",
              });
            
        }, 
        onError: (err) =>  {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong! Try again",
              });
        }
    })

    const handleSubmitBooking = async (date) =>  {
        const startDate = format(date[0].startDate, "PP")
        const endDate = format(date[0].endDate, "PP")
        const bookingData = {
            room_id: _id,
            title,
            price,
            imgUrl,
            startDate,
            endDate,
            bookingName: user?.displayName,
            bookingEmail: user?.email,
        }
        if(availability){
            try {
                await mutateAsync(bookingData)
                const {data} = await axiosSecured.patch(`/update-availablity/${_id}`, {"availability": false})
                navigate("/my-bookings")
            } catch (error) {
                console.log(error)
            }
        }else{
            modalRef.current.close()
            Swal.fire({
                icon: "error",
                title: "Room is not available now",
                text: "This room alreay booked by another user",
              });
        }
        
    }
    console.log(reviewData)
    if(isLoading) return <LoadingSpinner/>
    return (
        <div>
            {/* Helmet  */}
            <Helmet>
                <title>StayRooms | Room Details </title>
                <meta name="description" content="Browse through our selection of premium rooms designed to suit every traveler's needs. From luxurious suites to cozy budget-friendly options, book your ideal stay today." />
                <meta name="keywords" content="hotel booking, travel destinations, affordable stays, luxurious rooms, vacation packages, best travel deals" />
                <meta name="author" content="https://stay-rooms-bd.web.app" />
            </Helmet>
            <div>
                <PageTitleSection title={"Room Details - A Closer Look at Comfort"} path={"room details"}/>
            </div>
            <div className="max-w-7xl mx-auto px-4 xl:px-0 my-24">
                <div className="md:grid grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[500px]">
                    <div className="col-span-2 row-span-2 h-full w-full relative">
                        <img src={imgUrl} alt="" className="h-full w-full rounded-md" />
                        <p className={`absolute text-lg top-0 left-0  py-1 px-4 rounded-md font-medium text-white ${availability? "bg-green-600" : "bg-orange-600"}`}>{availability ? "Available" : "Unavailable"}</p>
                    </div>
                    <img src="https://i.ibb.co.com/kG2VhcD/Room-02-1.webp" alt="" className="col-span-1 w-full h-full rounded-lg" />
                    <img src="https://i.ibb.co.com/qJC6ds5/room-05.webp" alt="" className="col-span-1 w-full h-full rounded-lg" />
                </div>
                <div className="lg:grid grid-cols-3 gap-4 mt-10">
                    <div className="col-span-2">
                        <div className="flex items-center justify-between">
                            <h2 className="text-3xl font-extrabold my-6 text-primary-black dark:text-white dark:text-white tracking-wide">{title}</h2>
                            {
                                averageReview?.length > 0 ? <div className="flex items-center gap-2 px-4"> 
                                    <div style={{ maxWidth: 120, width: '100%' }} className="">
                                        <Rating readOnly value={averageReview} key={averageReview} />
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary-black dark:text-white dark:text-white">{averageReview?.length > 0 && averageReview}</h3>
                            </div> : <p className="px-6 text-xl font-medium text-red-500">No review yet 😣</p>
                            }
                        </div>
                        <h3 className="text-2xl font-extrabold text-primary">$ {price} / <span className="text-lg font-medium">Per Night</span></h3>
                        <p data-aos="fade-up" className="text-light-black dark:text-white/85 leading-8 my-6">{description}</p>
                        <div data-aos="fade-up" className="my-6">
                            <h3 className="text-2xl font-bold text-secondary-black dark:text-white dark:text-white my-3">Children and extra beds.</h3>
                            <p className="text-light-black dark:text-white/85">Children are welcome Kids stay free! Children stay free when using existing bedding; children may not be eligible for complimentary breakfast Rollaway/extra beds are available for $ 10 per day.</p>                        
                        </div>
                        <div className="mt-6">
                            <h3 data-aos="fade-up" className="text-2xl font-bold text-secondary-black dark:text-white dark:text-white my-3">Facilities</h3>
                            <div className="space-y-2 text-lg text-light-black dark:text-white/85">
                                {
                                    facilities?.map((item, idx)=>  <li data-aos="fade-up" key={idx} className="list-none flex items-center gap-2">
                                        <img src={check} alt="" />
                                        <span>{item}</span>
                                    </li>)
                                }
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 data-aos="fade-up" className="text-2xl font-bold text-secondary-black dark:text-white dark:text-white my-3">Highlights</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                {
                                    highlightFacilities.map((facilities, idx) =>  <div data-aos="fade-up" key={idx} className="flex cursor-pointer items-center gap-2 py-4 rounded border px-6 border-primary/20 dark:border-white/85">
                                        <img src={facilities.icon} alt="" className="w-6"/>
                                        <p className="text-secondary-black dark:text-white dark:text-white">{facilities.name}</p>
                                    </div> )
                                }
                            </div>
                        </div>
                        {/* Google map location  */}
                        <section className="h-[300px] my-12 rounded-md">
                            <div className=" w-full h-full rounded-md">
                                    <LeafletMaps/>
                            </div>
                        </section>

                        {/* User Review  */}
                        <div>
                            <div data-aos="fade-up" className="flex items-center justify-between p-4 bg-[#f5f6f9] rounded mt-8">
                                <div>
                                    <h5 className="text-lg font-medium text-light-black">By {reviewData?.length} reviewer(s)</h5>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h5 className="font-medium text-light-black">Sort by</h5>
                                    <div className="text-light-black">
                                        <Select
                                        options={options}
                                        name="visaType"
                                        onChange={optionOnChange}
                                        placeholder="Sort type"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Review content */}
                            {   
                                reviewData?.length > 0 ?
                                reviewData?.map(review =>  <div data-aos="fade-up" key={review?._id} className="bg-[#f5f6f9] px-6 py-8 rounded my-6 flex items-center gap-6">
                                    <div className="w-[35%]">
                                        <img src={review?.img} alt="" className="border border-gray-400  mx-auto w-20 h-20 rounded-full"/>
                                        <h6 className="text-lg font-bold text-light-black my-2 text-center">{review?.userName}</h6>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div style={{ maxWidth: 150, width: '100%' }} className="">
                                                <Rating readOnly value={review?.rating} key={review?.rating} />
                                            </div>
                                                <p className="text-xl font-bold text-primary-black">{review?.rating} / <span className="text-lg text-light-black ">5</span></p>
                                        </div>
                                        <h4 className="text-xl font-bold text-primary-black ">{review?.reviewTitle}</h4>
                                        <p className="max-w-[90%]  text-light-black ">{review?.feedback}</p>
                                        <p className="flex items-center gap-2 text-lg text-light-black">
                                            <span><IoCalendarOutline size={22} className="text-primary"/></span>
                                            <span>{review?.reviewTime}</span>
                                        </p>
                                    </div>
                                </div>) : <h3 className="text-2xl font-bold text-secondary-black dark:text-white capitalize my-10">No user review </h3>
                            }

                        </div>
                    </div>

                    {/* Aside  */}
                    <aside>

                        {/* Book Room card  */}
                        <div
                            className="text-center p-6 rounded-md space-y-3 flex flex-col items-center justify-center"
                            style={{background: "linear-gradient(125deg, rgba(99, 171, 69, 0.1) 0%, rgba(251, 176, 59, 0.1) 100%)",}}
                        > 
                            
                            <h3 className="text-2xl font-bold text-primary-black dark:text-white dark:text-white">Book Your Room</h3>
                            <p className="text-light-black dark:text-white/85">Reserve your ideal Room early for a hassle-free trip, secure comfort and convenience!</p>
                            <button onClick={()=> document.getElementById('my_modal_4').showModal()} className="px-5 py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2 font-medium tracking-wider">Book Now <BsArrowUpRightCircle size={22} /> </button>
                        </div>

                        {/* FAQ Section */}
                        <section>
                            <FAQ faqData={faq} title={"FAQ - General Question Answer"}/>
                        </section>
                    </aside>

                     {/* // modal  */}
                <div className="modal">
                    <dialog
                    ref={modalRef}
                    id="my_modal_4"
                    className={`modal`}
                    style={{
                        background:
                        "linear-gradient(125deg, rgba(99, 171, 69, 0.1) 0%, rgba(251, 176, 59, 0.1) 100%)",
                    }}
                    >
                    <div className="modal-box max-w-3xl bg-white">
                        <form method="dialog">
                        <button className="btn btn-sm md:btn-md border border-primary btn-circle right-5 absolute top-4 bg-gray-200 dark:bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-300">
                            <RiCloseLargeLine size={20} />
                        </button>
                        </form>
                        <RoomBookModal
                            onBooking={handleSubmitBooking}
                            roomData={detailsData}
                        // onApplicationSubmit={handleSubmitApplication}
                        />
                    </div>
                    </dialog>
                </div>
                {/* Modal close  */}
                </div>

            </div>
        </div>
    );
};

export default RoomDetails;