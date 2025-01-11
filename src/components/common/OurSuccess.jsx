import customer from "../../assets/icons/customer.svg"
import successIcon from "../../assets/icons/successIcon.svg"
import positiveReview from "../../assets/icons/positiveReview.svg"
import returnCustomer from "../../assets/icons/returnCustomer.svg"
import CountUp from "react-countup";
import tripAdvisor from "../../assets/icons/tripAdvisor.png"

const OurSuccess = () => {
    const successInfo = [
        {"title": 11.5, "text": "Happy Guests", "icon": customer},
        {"title": 32.8, "text": "Bookings Completed", "icon": successIcon},
        {"title": 98, "text": "Ratings & Reviews", "icon": positiveReview},
        {"title": 75, "text": "Returning Customers", "icon": returnCustomer},
    ]
    return (
        <div className="">
            {/* Success count  */}
            {/* <h3>Our Success With Happy Client</h3> */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 py-8 md:border-y md:border-base-300 my-6">
                {
                    successInfo.map((success, idx) =>  <div data-aos="fade-up" key={idx} className={`flex items-center gap-2 justify-center ${ idx ===  3? "border-r-0" : "lg:border-r-2"}`}>
                        <img src={success.icon} alt="" />
                        <div className="">
                            <span className="text-4xl  font-bold">
                                 <CountUp start={1.1} end={success.title} decimals={idx <= 1 ? 1 : ""} delay={idx ===  1 ? 2 : 1} duration={idx ===  1 && idx===  2 ? 4.5 : 3} />
                            </span>
                            <span className="text-4xl  font-bold">{idx > 1 ? "%" : " K"}</span>
                            <p className=" text-lg text-titleBlack/70">{success.text}</p>
                        </div>
                    </div>)
                }
            </div>
            <h5 data-aos="fade-up" className="text-center flex gap-6 justify-center items-center  font-medium text-secondary-black flex-wrap">
                <span className="text-xl secondary-black">Excellent! </span>
                <span>
                    5.0 Rating out of 5.0 based on
                    <a href="https://www.tripadvisor.com/" className="underline duration-300 hover:text-blue-500"> 1940 Reviews</a>
                </span>
                <span className="inline">
                    <img src={tripAdvisor} alt="" className="w-28 h-6"/>
                </span>
            </h5>
        </div>
    );
};

export default OurSuccess;