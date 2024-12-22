import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import BookingTableRow from "./BookingTableRow";
import useAxiosSecured from "../../hooks/useAxiosSecured";

const MyBooking = () => {
    const {user} = useAuth()
    const axiosSecured = useAxiosSecured()
    const [bookedRoom, setBookedRoom] = useState([]);
    

    // const openTableAction = () =>  {

    // }
    useEffect(()=>  {
        axiosSecured.get(`/booked-room/${user?.email}`)
        .then(res =>  setBookedRoom(res.data))
    }, [])

  
    return (    
        <div className="">

            {/* Table data  */}
            <div className="overflow-x-auto">
            <div className="overflow-x-auto min-w-[950px] max-w-7xl mx-auto px-4 xl:px-0 my-24">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                        Room Info
                    {/* <label>
                        <input type="checkbox" className="checkbox" />
                    </label> */}
                    </th>
                    <th>Booking Details</th>
                    <th>Booking Date</th>
                    <th>Actions</th>
                    {/* <th></th> */}
                </tr>
                </thead>
                <tbody className="">
                    {
                        bookedRoom?.map(room =>  <BookingTableRow key={room._id} bookedRoomData={room}/>)
                    }
               
                </tbody>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
            </div>
            </div>

            <div>
                <p>another div</p>
            </div>
        </div>
    );
};

export default MyBooking;