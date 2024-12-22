import useAuth from "../../hooks/useAuth";
import BookingTableRow from "./BookingTableRow";
import useAxiosSecured from "../../hooks/useAxiosSecured";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { differenceInDays } from "date-fns";

const MyBooking = () => {
    const {user} = useAuth()
    const axiosSecured = useAxiosSecured()
    const queryClient = useQueryClient()

    const {data:bookedRoom, isLoading} = useQuery({ queryKey: ['mybooking'], queryFn: async() =>  {
        const {data} = await axiosSecured.get(`${import.meta.env.VITE_BASE_URL}/booked-room/${user?.email}`)
        return data
    } })

    
    const handleCancellation = async (id, startDate) => {
        const currentDate = new Date();
        const daysDifference = differenceInDays(new Date(startDate), new Date(currentDate));
        if(daysDifference > 1){
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3c65f5",
                confirmButtonText: "Confirm Cancel",
                cancelButtonText: "Keep",
              }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { data } = await axiosSecured.delete(
                          `${import.meta.env.VITE_BASE_URL}/cancel-booking/${id}`
                        );
                        if(data.deletedCount > 0){
                            queryClient.invalidateQueries({ queryKey: ['mybooking'] })
                            Swal.fire({
                                title: "Cancellation Done",
                                text: "Your Booking has been Cancel.",
                                icon: "success"
                              });
                        }
                        
                      } catch (error) {
                        console.error('Error during cancellation:', error);
                      }
                }
              });
        }else{
            Swal.fire({
                icon: "error",
                title: "Sorry! Can't Cancel",
                text: "You're late!!  you must cancel before 1 day",
            });
        }
        
      };
    //   Update Booking Date 
    if(isLoading) return <LoadingSpinner/>
  
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
                        bookedRoom?.map(room =>  <BookingTableRow key={room._id} bookedRoomData={room} onCancellation={handleCancellation}/>)
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