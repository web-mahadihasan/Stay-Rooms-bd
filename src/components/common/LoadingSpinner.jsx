import { CirclesWithBar } from "react-loader-spinner";

const LoadingSpinner = () => {
    return (
        <div className='flex items-center justify-center w-full min-h-[calc(100vh-305px)]'>
          <div
            aria-label='Loading...'
            role='status'
            className='flex items-center space-x-2 flex-col'
          >
            <div>
            <CirclesWithBar
                height="70"
                width="70"
                color="#4fa94d"
                outerCircleColor="#4fa94d"
                innerCircleColor="#4fa94d"
                barColor="#4fa94d"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            </div>
            <span className='text-2xl font-medium text-light-black'>Loading...</span>
          </div>
        </div>
      )
};

export default LoadingSpinner;