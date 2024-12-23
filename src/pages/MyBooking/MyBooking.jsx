import useAuth from "../../hooks/useAuth";
import BookingTableRow from "./BookingTableRow";
import useAxiosSecured from "../../hooks/useAxiosSecured";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { differenceInDays, format } from "date-fns";
import { useRef, useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import logo from "../../assets/images/stayroom.png"
import { DateRange } from "react-date-range";
import { IoCalendarOutline } from "react-icons/io5";

const MyBooking = () => {
    const {user} = useAuth()
    const axiosSecured = useAxiosSecured()
    const queryClient = useQueryClient()
    const updateModalRef = useRef()
    const [openCalender, setOpenCalender] = useState(false)
    const [updateId, setUpdateId] = useState("")
    
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    // Get user booking room 
    const {data:bookedRoom, isLoading} = useQuery({ queryKey: ['mybooking'],
        enabled: !!user?.email,
        queryFn: async() =>  {
        const {data} = await axiosSecured.get(`/booked-room/${user?.email}`)
        return data
    } })

    // Handle Cancellation 
    const handleCancellation = async (id,roomId, startDate) => {
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
                        const { data } = await axiosSecured.delete(`/cancel-booking/${id}`);
                        if(data.deletedCount > 0){
                            queryClient.invalidateQueries({ queryKey: ['mybooking'] })
                            const {data} = await axiosSecured.patch(`/update-availablity/${roomId}`, {"availability": true})
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
     const updateDataModal = (id, prevStartDate, prevEndDate) =>  {
        updateModalRef.current.showModal()
        setUpdateId(id)
        setRange([{
            startDate: new Date(prevStartDate),
            endDate: new Date(prevEndDate),
            key: 'selection'
        }])
      }

    //   Axios mutation for date update
    const {isPending ,mutateAsync} = useMutation({
        mutationFn: async updateData =>  {
            await axiosSecured.patch(`/update-date/${updateId}`, updateData)
        },
    })
    const updateDate = async () =>  {
        const update = {
            startDate: format(range[0].startDate, "PP"), 
            endDate: format(range[0].endDate, "PP")
        }
        try {
            await mutateAsync(update)
            queryClient.invalidateQueries({ queryKey: ['mybooking'] })
            updateModalRef.current.close()
        } catch (error) {
            console.log(error)
        }
    }

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
                        bookedRoom?.map(room =>  <BookingTableRow key={room._id} 
                            bookedRoomData={room} 
                            onCancellation={handleCancellation}
                            onUpdate={updateDataModal}
                            />)
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

            {/* Update date Modal  */}
            <div className="modal">
                <dialog ref={updateModalRef} id="my_modal_4"
                    className={`modal`} style={{ background:
                        "linear-gradient(125deg, rgba(99, 171, 69, 0.1) 0%, rgba(251, 176, 59, 0.1) 100%)",}}>
                <div className="modal-box max-w-2xl">
                    <form method="dialog">
                        <button className="btn btn-sm md:btn-md border border-primary btn-circle right-5 absolute top-4">
                            <RiCloseLargeLine size={20} />
                        </button>
                    </form>
                        {/* Modal content  */}
                    <div className="flex items-center justify-center">
                        <img src={logo} alt="" className="h-12" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-center text-secondary-black my-8">Update Booking date</h3>
                        <div className="text-center my-8">
                            <h3 className="text-xl my-6 font-bold text-secondary-black">Select Your Booking Date:</h3>
                            <div onClick={() =>  setOpenCalender(true)} className="flex justify-between border items-center px-3 w-full md:w-1/2 mx-auto my-4 py-2 rounded-md">
                                <input 
                                value={`${format(range[0].startDate, "PP")} - ${format(range[0].endDate, "PP") || ""}`}
                                readOnly
                                className="border-none outline-none flex-1 cursor-pointer" 
                                />
                                <IoCalendarOutline size={22} className="text-primary" />
                            </div>
                            {openCalender && <div>
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setRange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={range}
                                    direction="horizontal"
                                    minDate={new Date()}
                                />
                                </div>
                            }
                        </div>
                        <div className="flex justify-center text-center">
                            {
                                openCalender? <button onClick={() =>  setOpenCalender(false)} className=" px-5 py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2 font-medium tracking-wider">Apply Date</button> 
                                : <button onClick={updateDate} className=" px-5 py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2 font-medium tracking-wider">Submit Booking</button>
                            }
                        </div>
                    </div>
                </div>
                </dialog>
            </div>
            {/* Modal end  */}
        </div>
    );
};

export default MyBooking;