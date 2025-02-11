import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { GrCopy } from "react-icons/gr";
import { RiCheckDoubleLine } from "react-icons/ri";
const PromotionCard = ({heading, offtext, coupon, des, date, bgTo, bgFrom}) => {
    const [copyed, setCopyed] = useState(false)

    const handlePromotion = () => {
        navigator.clipboard.writeText(coupon)
        setCopyed(true)
        toast.success("Coupon Copy")
    }
    return (
        <div className='h-full border-2 border-gray-200 rounded-md promotion-shadow flex flex-col p-3 bg-white dark:bg-gray-200 dark:border-gray-200'>
            <div className={`flex-1 flex flex-col p-3 justify-between rounded-md text-white h-full`}
                style={{ background: `linear-gradient(to right, ${bgFrom}, ${bgTo})` }}
            >
                <div className=''>
                    <p className='text-xl font-medium'>{heading}</p>
                    <h3 className='text-2xl font-bold'>{offtext}</h3>
                </div>
                <div className='px-2 py-1 rounded-md border border-white w-fit border-dashed'>
                    <p className='text-sm'>Use Code:</p>
                    <h6 className='text-lg font-extrabold tracking-wider flex items-center gap-2'>{coupon} <span onClick={handlePromotion} className='text-gray-300 cursor-pointer'> {copyed ? <RiCheckDoubleLine className='text-white'/> : <GrCopy />} </span></h6>
                </div>
            </div>
            <p className='text-base text-light-black font-medium'>{des}</p>
            <p className='text-sm text-light-black'>valid till: {date}</p>
        </div>
    );
};

export default PromotionCard;