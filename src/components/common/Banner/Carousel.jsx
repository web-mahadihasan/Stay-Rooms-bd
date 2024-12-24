// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slider from './Slider'

// import bgimg1 from '../assets/images/carousel1.jpg'
// import bgimg2 from '../assets/images/carousel2.jpg'
// import bgimg3 from '../assets/images/carousel3.jpg'

const bgimg1 = "https://i.ibb.co.com/bvdvrrb/beautiful-historical-places-taj-mahal.jpg";
const bgimg2 = "https://i.ibb.co.com/zmRGHs4/home2-banner-img1.webp";
const bgimg3 = "https://i.ibb.co.com/qn5LpgZ/hero-home1-slider-4.webp";

export default function Carousel() {
  return (
    <div className='container px-4 xl:px-0 py-6 mx-auto -z-0'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper rounded-xl'
      >
        <SwiperSlide>
          <Slider
            image={bgimg1}
            text='Get Your Web Development Projects Done in minutes'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            image={bgimg2}
            text='Get Your Graphics Design Projects Done in minutes'
          />
        </SwiperSlide>
        <SwiperSlide>
          <Slider
            image={bgimg3}
            text='Start Your Digital Marketing Campaigns up n running'
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}