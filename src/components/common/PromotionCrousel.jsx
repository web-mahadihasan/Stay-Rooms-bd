import React, { useEffect } from "react"
import Glide from "@glidejs/glide"
import PromotionCard from "./PromotionCard"

export default function PromotionCrousel() {
  useEffect(() => {
    const slider = new Glide(".glide-09", {
      type: "carousel",
      autoplay: 500,
      animationDuration: 20000,
      hoverpause:true,
      animationTimingFunc: "linear",
      perView: 4,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1140: {
          perView: 3,
        },
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
          // gap: 36,
        },
      },
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [])

  return (
    <>
      {/*<!-- Component: Testimonial carousel --> */}
      <div className="glide-09 overflow-hidden relative w-full">
        {/* <!-- Slides --> */}
        <div className="w-[200px] hidden bg-gradient-to-r from-white/10 to-white/80 h-full absolute min-h-[350px] top-0 right-0 z-10 lg:block"></div>
        <div className="w-[200px] bg-gradient-to-r to-white/10 from-white/70 h-full absolute min-h-[350px] top-0 left-0 z-10 hidden lg:block"></div>
        <div data-glide-el="track">
        <ul className="whitespace-no-wrap overflow-hidden flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
          <li className="h-[250px]">
            
              <PromotionCard heading={"New User Offer on"}
                offtext={"15% OFF"} coupon={"STAYNEW"}
                des={"Register & Enjoy Great Discount on first booking"} date={"31 dec, 2024(T&C apply)"}
                bgTo={"#91fff9"} bgFrom={"#2273ef"}
              />
            </li>
          <li className="h-[250px]">
              <PromotionCard heading={"December Delights!"} 
              offtext={"FLAT 20% OFF"} 
              coupon={"FESTIVE20"} 
              des={"Book your stay this festive season and celebrate"} date={"5th Jan 2025 (T&Cs apply)"}
              bgTo={"#FFE57D"} bgFrom={"#D4453F"}
              />
            </li>      
            <li className="h-[250px]">
              <PromotionCard heading={"New Year’s Countdown"} 
              offtext={"Get 30% OFF"} 
              coupon={"NEWYEAR30"} 
              des={"Ring in the New Year with incredible savings"} date={"10th Feb 2025 (T&Cs apply)"}
              bgTo={"#5fd8d4"} bgFrom={"#42753e"}
              />
            </li> 
            <li className="h-[250px]">
              <PromotionCard heading={"New Year’s Countdown"} 
              offtext={"Get 30% OFF"} 
              coupon={"NEWYEAR30"} 
              des={"Ring in the New Year with incredible savings"} date={"10th Feb 2025 (T&Cs apply)"}
              bgTo={"#91fff9"} bgFrom={"#2273ef"}
              />
            </li>
            <li className="h-[250px]">
              <PromotionCard heading={"Holiday Season Special!"} 
              offtext={"Enjoy 25% OFF"} 
              coupon={"HOLIDAY25"} 
              des={"Make your December bookings magical with us"} date={"15th Jan 2025 (T&Cs apply)"}
              bgTo={"#c09cff"} bgFrom={"#e444ff"}
              />
            </li>
          </ul>
        </div>
     
      </div>
      {/*<!-- End Testimonial carousel --> */}
    </>
  )
}