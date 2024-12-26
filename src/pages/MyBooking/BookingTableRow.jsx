import { useRef, useState } from "react";
import { CgCloseO } from "react-icons/cg";
import { CiMenuKebab } from "react-icons/ci";
import { RiCloseLargeLine } from "react-icons/ri";
import logo from "../../assets/images/stayroom.png"
import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import ReviewModal from "../../components/common/ReviewModal";
import { format } from "date-fns";
import { axiosSecured } from "../../hooks/useAxiosSecured";
import Swal from "sweetalert2";

const BookingTableRow = ({bookedRoomData, onCancellation, onUpdate}) => {
    const [modalOpen, setModalOpen] = useState(false)
    const {user} = useAuth()

    const {_id, title, price, imgUrl, bookingName, bookingEmail, startDate, endDate, room_id} = bookedRoomData || {}
    
    const handleReviewSubmit = async (rating, title, feedback) =>  {
        const timestamp = format(new Date(), "Pp")
        const reviewData = {
            userName: user?.displayName,
            userEmail: user?.email,
            reviewTitle: title,
            reviewTime: timestamp,
            img: user?.photoURL,
            feedback,
            rating,
            room_id
        }
        try {
            const {data} = await axiosSecured.post(`/reviews`, reviewData)
            if(data.insertedId){
                setModalOpen(false)
                Swal.fire({
                    title: "Review Submitted",
                    text: "Your review has been submit.",
                    icon: "success"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <tr data-aos="fade-up" className=" rounded-md dark:text-white border-gray-200">
        {/* <th>
        <label>
            <input type="checkbox" className="checkbox" />
        </label>
        </th> */}
        <td>
        <div className="flex items-center gap-4 ">
            <div className="avatar">
                <div className="mask rounded-md h-[150px] w-[200px]">
                    <img
                    src={imgUrl}
                    alt="" className=" h-[200px] w-[200px]"/>
                </div>
            </div>
            <div>
                <div className="font-bold text-xl text-primary-black dark:text-white">{title}</div>
                <div className="font-bold text-xl text-primary mt-1"><span className="text-light-black dark:text-white/85">Price: </span>$ {price}</div>
            </div>
        </div>
        </td>
        <td className="text-base text-light-black font-medium">
            <p className="text-light-black dark:text-white/85"><span className="text-lg text-primary-black dark:text-white">Booked By:</span> {bookingName}</p>
            <p className="text-light-black dark:text-white/85"><span className="text-lg text-primary-black dark:text-white">Email:</span> {bookingEmail}</p>
        <br />
        </td>
        <td className="text-base font-normal text-light-black dark:text-white/85">
            <p>{startDate}</p>
            <p className="text-center">-</p>
            <p>{endDate}</p>
        </td>
        <th className="h-[130px] relative min-w-[150px]">
            <div className="flex flex-col gap-1">
                <button onClick={() =>  onCancellation(_id, room_id, startDate)} className="text-base font-medium px-1 py-1 bg-red-500 text-white rounded">Cancel</button>
                <button onClick={() =>  onUpdate(_id, startDate, endDate)} className="text-base font-medium px-1 py-1 bg-primary/80 text-white rounded">Update Date</button>
                <button onClick={() =>  setModalOpen(true)} className="text-base font-medium px-1 py-1 bg-green-500 text-white rounded">Give Review</button>
            </div>
         
        </th>
        <th>
           <ReviewModal modalOpen={modalOpen} 
           setModalOpen={setModalOpen} 
           onReviewSubmit={handleReviewSubmit}
           />
        </th>
    </tr>
    );
};

export default BookingTableRow;