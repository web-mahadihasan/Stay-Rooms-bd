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
    const [openActionRow, setOpenActionRow] = useState(null);
    const [openAction, setOpenAction] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [freedback, setFreedback] = useState("")
    const {user} = useAuth()

    const {_id, title, price, imgUrl, bookingName, bookingEmail, startDate, endDate, room_id} = bookedRoomData || {}
    
    const handleActionClick = (id) => {
        setOpenActionRow(openActionRow ===   id ? null : id);
        setOpenAction(true)
    };
    const handleRowActionClose = () =>  {
        setOpenActionRow(null)
        setOpenAction(false)
    }
    const handleReviewSubmit = async (rating) =>  {
        const timestamp = format(new Date(), "Pp")
        const reviewData = {
            userName: user?.displayName,
            userEmail: user?.email,
            reviewTime: timestamp,
            img: user?.photoURL,
            freedback,
            rating,
            room_id
        }
        try {
            const {data} = await axiosSecured.post(`/reviews`, reviewData)
            if(data.insertedId){
                setModalOpen(false)
                setFreedback("")
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
        <tr className="">
        {/* <th>
        <label>
            <input type="checkbox" className="checkbox" />
        </label>
        </th> */}
        <td>
        <div className="flex items-center gap-4">
            <div className="avatar">
                <div className="mask rounded-md h-[150px] w-[200px]">
                    <img
                    src={imgUrl}
                    alt="" className=" h-[200px] w-[200px]"/>
                </div>
            </div>
            <div>
                <div className="font-bold text-xl text-primary-black">{title}</div>
                <div className="font-bold text-xl text-primary mt-1"><span className="text-light-black">Price: </span>$ {price}</div>
            </div>
        </div>
        </td>
        <td className="text-base text-light-black font-medium">
            <p><span className="text-lg text-primary-black">Booked By:</span> {bookingName}</p>
            <p><span className="text-lg text-primary-black">Email:</span> {bookingEmail}</p>
        <br />
        </td>
        <td className="text-base font-normal text-light-black">
            <p>{startDate}</p>
            <p className="text-center">-</p>
            <p>{endDate}</p>
        </td>
        <th className="h-[130px] relative min-w-[150px]">
            <button onClick={() => handleActionClick(bookedRoomData?._id)} className={`p-3 border border-primary/20 rounded-full ${openAction? "hidden" : "block"}`}><CiMenuKebab size={26} /></button>
            {
                openActionRow ===   bookedRoomData._id && <div className={`w-full p-1 h-full bg-primary/10 border border-primary/60 rounded-md absoulte duration-700 ${ openAction? "top-0 left-0 block" : "right-[800px] top-0"}`}>
                <div className="flex justify-end p-2">
                    <button onClick={handleRowActionClose} className=""><CgCloseO size={20} /></button>
                </div>
                <div className="flex flex-col gap-1">
                    <button onClick={() =>  onCancellation(_id, room_id, startDate)} className="text-base font-medium px-1 py-1 bg-red-500 text-white rounded">Cancel</button>
                    <button onClick={() =>  onUpdate(_id, startDate, endDate)} className="text-base font-medium px-1 py-1 bg-primary/80 text-white rounded">Update Date</button>
                    <button onClick={() =>  setModalOpen(true)} className="text-base font-medium px-1 py-1 bg-green-500 text-white rounded">Give Review</button>
                </div>
            </div> 
            }
        </th>
        <th>
           <ReviewModal modalOpen={modalOpen} 
           setModalOpen={setModalOpen} 
           onReviewSubmit={handleReviewSubmit}
           setFreedback={setFreedback}
           />
        </th>
    </tr>
    );
};

export default BookingTableRow;