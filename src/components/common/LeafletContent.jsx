import React from 'react';
import { FaLocationDot } from 'react-icons/fa6';
import { BiSolidPhoneCall } from "react-icons/bi";

const LeafletContent = () => {
    return (
        <div>
            <h3 className="text-2xl font-bold my-4 leading-9">
            Cheapest Deals on Budget & Luxury Rooms are Available at StayRooms
            BD
          </h3>
          <p className="text-light-black">
            Due to the huge influx of tourists in World, StayRooms offers a
            wide range of luxury, deluxe and budget hotels to them. Choose to
            stay in luxury and comfort with the greatest discounts available on
            hotel bookings. We list the classiest budget hotels on our site
            along with some of the prominent international hotel chains of India
            including Oberoi Group, ITC Group, Taj Group, Le Meridian Group and
            many others. 
          </p>
          <p className='flex items-center gap-2 mt-3 text-lg text-primary-black'>
            <span><FaLocationDot size={24} className='text-primary' /></span>
            <span>5 Ave lalbagh mor, Rangpur, Bangladesh</span>
          </p>
          <p className='flex items-center gap-2 mt-2 mb-5 text-lg text-primary-black'>
            <span><BiSolidPhoneCall size={24} className='text-primary' /></span>
            <span>+1695485745</span>
          </p>
          <div>
            <h5 className='text-xl font-semibold my-2'>Download StayRooms App</h5>
            <p className='text-sm md:w-[60%] w-full p-1 bg-[#e1ffe4] border border-primary/60 border-dashed rounded'>Save Up to BDT 2000 OFF on your first room booking Use Code: STAYFIRST</p>
            <p className='text-light-black my-2'>For Hassle-Free Hotel Booking</p>
            <div className='flex items-center gap-1'>
              <div className='space-y-2'>
                <img src="https://images.emtcontent.com/app-web/google-play.png" alt="" className='h-10'/>
                <img src="https://images.emtcontent.com/app-web/app-store.webp" alt=""className='h-10' />
              </div>
              <div>
                <img src="https://images.emtcontent.com/train-img/app-qr-code.svg" alt="" className='h-24' />
              </div>
            </div>
          </div>
        </div>
    );
};

export default LeafletContent;