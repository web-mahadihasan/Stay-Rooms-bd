
import { Rating } from "@smastrom/react-rating";
import React from "react";

import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = ({review}) => {
    const {userName, reviewTitle, img, feedback, rating, reviewTime} = review || {}
  return (
    <>
      <div className="w-full border border-base-200 bg-base-100 text-secondary shadow-2xl rounded-lg p-6 relative">
        <FaQuoteRight className="text-[4rem] text-[#e9e9e959] absolute top-[10%] right-[10%] " />
        <div className="flex items-center gap-4 mt-4">
          <img
            src={img}
            alt="demo/image"
            className="w-14 h-14 object-cover rounded-full"
          />
          <div>
            <h2 className="text-[1.2rem] font-[500] text-black">{userName}</h2>
            <p className="text-[0.9rem] text-light-black">CEO of Google</p>
          </div>
        </div>

        <h2 className="text-[1.3rem] capitalize font-semibold mt-5 text-secondary-black leading-[30px]">
            {reviewTitle}
        </h2>

        <p className=" text-justify text-[0.9rem] my-3 text-light-black">
            {feedback}
        </p>
        <div className="flex items-center justify-between">
           <div style={{ maxWidth: 120, width: '100%' }} className="">
                <Rating readOnly value={rating} key={rating} />
            </div>
            <p className="text-light-black/80 font-semibold">{reviewTime}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
              