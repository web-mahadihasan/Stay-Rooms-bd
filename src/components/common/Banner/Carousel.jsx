import React, { useEffect } from "react"
import Glide from "@glidejs/glide"
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import Slider1 from "./Slider1";

const Carousel = () =>  {
  useEffect(() => {
    const slider = new Glide(".glide-01", {
      type: "carousel",
      focusAt: "center",
      perView: 1,
      autoplay: 5000,
      animationDuration: 450,
      gap: 24,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      breakpoints: {
        1024: {
          perView: 1,
        },
        640: {
          perView: 1,
        },
      },
    }).mount();

    return () => {
      slider.destroy()
    }
  }, [])

  const bgimg2 = "https://i.ibb.co.com/K6Zb1Dz/limak-eurasia-luxury.jpg";
  const bgimg1 = "https://i.ibb.co.com/fkLMjm3/194452282.jpg";
  const bgimg3 = "https://i.ibb.co.com/JCXK7N4/banner3.png";


  return (
    <>
      {/*<!-- Component: Carousel with controls inside --> */}
      <div className="glide-01 relative container mx-auto">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden container mx-auto rounded-xl mt-1" data-glide-el="track">
        <ul className="w-full whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">            
            <li className='w-full bg-center bg-cover bg-no-repeat min-h-[640px] rounded-xl'>
              <Slider1 image={bgimg1}
                title={"Stay in Comfort, Book with Confidence"}
                subtitle={"Welcome to StayRooms!"}
                decsription={"Need a room? StayRooms has you covered! Quick, easy, and stress-free bookings for all types of stays."}
              />
            </li>
            <li className="border bg-gray-100 min-h-[680px] w-full">
              <Slider1
                image={bgimg2}
                title={"For Luxury, Find Your."}
                subtitle={"Perfect Room Anytime"}
                description={"Save time and money with StayRooms. Book your dream room now and enjoy your stay, stress-free."}
              />
            </li>
            <li className="border bg-gray-100 min-h-[680px] w-full">
              <Slider1
                image={bgimg3}
                title={"Experience Elegance with Every Booking."}
                subtitle={"Explore and Book Today."}
                description={"Explore the best stays at unbeatable rates with StayRooms. Your ideal room is just a click away!"}
              />
            </li>
            
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <GoArrowLeft />
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <GoArrowRight />
          </button>
        </div>
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.0.2/glide.js"></script>
      {/*<!-- End Carousel with controls inside --> */}
    </>
  )
}

export default Carousel;