import { Link } from "react-router";

const Slider = ({ image, text }) => {
  return (
    <div
      className='w-full bg-center bg-cover h-[700px] rounded-xl'
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className='rounded-xl flex items-center justify-center w-full h-full bg-gray-900/50'>
        <div className='text-center'>
          <h1 className='text-3xl max-w-5xl font-bold text-white lg:text-4xl xl:text-[40px]'>
            Stay in Comfort, Book with Confidence <span className="inline-block my-4">Welcome to StayRooms!</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl text-center mx-auto my-4">Need a room? StayRooms has you covered! Quick, easy, and stress-free bookings for all types of stays.</p>
          <br />
          <Link to='/add-job'  className='w-full px-5 py-4 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-gray-600 rounded-md lg:w-auto hover:bg-gray-500 focus:outline-none focus:bg-gray-500'>
            Post Job & Hire Expert
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Slider;