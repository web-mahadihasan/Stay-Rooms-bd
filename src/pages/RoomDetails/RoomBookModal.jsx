import { useState } from "react";
import logo from "../../assets/images/stayroom.png"
import { DateRange, DateRangePicker } from "react-date-range";
import { Calendar } from 'react-date-range';
import { addDays, format, formatDistance } from 'date-fns';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { IoCalendarOutline } from "react-icons/io5";

const RoomBookModal = ({roomData, onBooking}) => {
    const {title, price, imgUrl, description, availability} = roomData || {}
    const [openCalender, setOpenCalender] = useState(false)
    const [range, setRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
      const result = formatDistance(new Date(range[0].startDate), new Date(range[0].endDate))
      
    return (
        <div >
        <div className="flex items-center justify-center">
            <img src={logo} alt="" className="h-12" />
      </div>
 
        {/* Visa application form  */}
        <div className="max-w-3xl mx-auto my-10">
            <img src={imgUrl} alt="" className="w-full h-[350px] rounded-lg"/>
            <h2 className="text-3xl font-extrabold my-6 text-primary-black tracking-wide">{title}</h2>
            <h3 className="text-2xl font-extrabold text-primary">$ {price} / <span className="text-lg font-medium">Per Night</span></h3>
            <p className="text-light-black leading-8 my-6">
                {description}
            </p>
            {/* Date  */}
            <div>
                <h3 className="text-xl font-bold text-secondary-black">Select Your Booking Date:</h3>
                <div onClick={() =>  setOpenCalender(true)} className="flex justify-between border items-center px-3 w-full md:w-1/2 my-4 py-2 rounded-md">
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
                    <button className="px-4 py-1.5 bg-primary rounded-lg text-white ml-2" onClick={() =>  setOpenCalender(false)}>Apply</button>
                    </div>
                }
            </div>
            {/* Quantity  */}

            <div>
                <button onClick={() =>  onBooking(range)} className=" px-5 py-2 bg-primary text-white rounded shadow-xl border border-primary hover:bg-secondary-black hover:border-secondary-black duration-500 flex items-center gap-2 font-medium tracking-wider">Submit Booking</button>
            </div>
        </div>
    </div>
    );
};

export default RoomBookModal;