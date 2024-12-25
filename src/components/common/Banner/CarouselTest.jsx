// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import Slider1 from './Slider1'
import Slider2 from './Slider2'
import Slider3 from './Slider3'

const bgimg2 = "https://i.ibb.co.com/K6Zb1Dz/limak-eurasia-luxury.jpg";
const bgimg1 = "https://i.ibb.co.com/fkLMjm3/194452282.jpg";
const bgimg3 = "https://i.ibb.co.com/JCXK7N4/banner3.png";

export default function CarouselTest() {
  return (
    <div className='container px-4 xl:px-0 py-2 mx-auto -z-0'>
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
        <SwiperSlide className='min-h-[640px]'>
          <Slider1
            image={bgimg1}
          />
        </SwiperSlide>
        <SwiperSlide className='min-h-[640px]'>
          
          <Slider2
            image={bgimg2}
          />
        </SwiperSlide>
        <SwiperSlide className='min-h-[640px]'>
          <Slider3
            image={bgimg3}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}