import React, { useEffect } from "react"
import Glide from "@glidejs/glide"
import { GoArrowLeft, GoArrowRight } from "react-icons/go"
import PromotionCard from "../../components/common/PromotionCard"
import ReviewCard from "./ReviewCard"


const UserReviews = ({allReviews}) => {

  useEffect(() => {
    const slider = new Glide(".glide-06", {
      type: "carousel",
      focusAt: "center",
      perView: 3,
    //   autoplay: 3000,
      animationDuration: 700,
      gap: 24,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1200: {
          perView: 3,
        },
        1024: {
          perView: 2,
        },
        640: {
          perView: 1,
        },
      },
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [allReviews])

  return (
    <>
      {/*<!-- Component: Card Carousel --> */}
      <div className="glide-06 relative w-full  overflow-hidden rounded">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
            
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] overflow-hidden [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full p-0">
            {
                allReviews?.map(review =>  <li key={review._id} className="min-h-[300px] w-full h-full relative ">
                    <ReviewCard review={review}/>
                  </li>)
            }
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex z-40  h-8 w-8 items-center justify-center rounded-full border border-white bg-primary/60 text-white transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >  <GoArrowLeft />
          </button>
          <button
            className="inline-flex z-40 h-8 w-8 items-center justify-center rounded-full border border-white bg-primary/60 text-white transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >  <GoArrowRight />
          </button>
        </div>
      </div>
      {/*<!-- End Card Carousel --> */}
    </>
  )
}

export default UserReviews;