import { RxCross1 } from "react-icons/rx";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";

const AutoShowModal = ({autoShowModal, setAutoShowModal}) => {
    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = "2025-03-10T23:59:59"

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, "0");
    const handleBook = () =>  {
        setAutoShowModal(false)
        navigate("/rooms")
    }
  return (
    <>
      <div
        className={`${
          autoShowModal ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
        } w-full h-screen fixed top-0 left-0 z-50 bg-[#0000002a] flex items-center justify-center transition-all duration-300 `}>
        <div className="w-[90%] md:p-8 lg:w-[50%] bg-[#ffffff] rounded-lg p-4 ">
          
          <div className="relative">
            {/* Close Modal  */}
            <div className="absolute z-40 right-2 top-2 border rounded-full border-primary">
                <RxCross1
                className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                onClick={() => setAutoShowModal(false)}
                />
          </div>
          {/* Modal content  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-md">
            <img alt="product/image" src="https://i.ibb.co.com/MR09pbr/room-image-2-768x512.webp"
                className="w-full h-full rounded-t-md lg:rounded-l-md"/>

            <div className="bg-[#ffd37c] rounded-b-md lg:rounded-r-md p-5 lg:p-12">
                <span className="text-[0.9rem] font-semibold text-blue-600">PROMOTION</span>
                <h4 className="text-[1.5rem] lg:text-[1.8rem] font-medium mt-2">Hurry up! 40% OFF</h4>
                <p className="text-[0.9rem] font-normal text-gray-900 mt-2">Beautyful Luxury Rooms are waiting for you</p>

                <div className="mt-5">
                    <p className="text-[0.9rem] font-normal text-gray-900">Offer expires in:</p>
                    <div className="flex items-center gap-[10px] mt-2">
                        <div className="flex items-center justify-center flex-col">
                            <h5 className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">{formatNumber(timeLeft.days)}</h5>
                            <span className="text-[0.7rem]">Days</span>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h5 className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">{formatNumber(timeLeft.hours)}</h5>
                            <span className="text-[0.7rem]">Hours</span>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h5 className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">{formatNumber(timeLeft.minutes)}</h5>
                            <span className="text-[0.7rem]">Minutes</span>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h5 className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">{formatNumber(timeLeft.seconds)}</h5>
                            <span className="text-[0.7rem]">Seconds</span>
                        </div>
                    </div>
                </div>

                <button onClick={handleBook} className="py-2 px-6 rounded-md bg-black text-white mt-5 text-[1rem]">Book Room</button>
            </div>

            </div>
            </div>
            {/* Card end  */}

        </div>
      </div>
    </>
  );
};

export default AutoShowModal;
              