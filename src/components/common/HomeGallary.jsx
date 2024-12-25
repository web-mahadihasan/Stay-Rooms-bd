import { useState } from "react";

const HomeGallary = ({gallaryData}) => {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px] w-full  min-h-[400px]">
            {
                gallaryData?.map((gallary, idx) =>  <div key={idx}
                    className={`col-span-1 rounded overflow-hidden flex justify-between flex-col row-span-1 bg-no-repeat bg-cover object-cover min-h-[200px] bg-black relative ${gallary.rowSpan && "lg:row-span-2 md:row-span-2 md:col-span-2 lg:col-span-1"} ${gallary.colSpan && " lg:col-span-2"}`}
                    style={{  backgroundImage: `url(${gallary?.img})`,}}
                    >
                    <div className={`w-full bg-gray-900/50 h-full py-8 duration-300
                        ${
                            hovered !==  null && hovered !==  idx
                                ? "blur-sm scale-100"
                                : "scale-100"
                        } hover:scale-105 hover:z-10 hover:blur-none`}
                        onMouseEnter={() => setHovered(idx)}
                        onMouseLeave={() => setHovered(null)}
                        >    
                    <div className="px-8 absolute bottom-8 z-20 w-full lg:w-[90%]">
                        <h4 className="text-lg font-semibold text-white">{gallary?.title}</h4>
                        <p className="text-[0.90rem] mt-3 text-white/90 w-full font-[300]">{gallary?.description}</p>
                        <button
                            className="w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-3 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b">
                            Book Room
                        </button>
                    </div>
                    </div>
                </div>)
            }
              {/* // {
    //   "title": "Exclusive Deals",
    //   "description": "Save on stays with amazing offers, discounts, and exclusive perks.",
    //   "rowSpan": false,
    //   "colSpan": false,
    //   "img": "https://example.com/images/exclusive-deals.jpg"
    // } */}

        </div>
    );
};

export default HomeGallary;
                    