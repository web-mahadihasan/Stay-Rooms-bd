import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/images/stayroom.png"
import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa6";

const ReviewModal = ({modalOpen, setModalOpen, onReviewSubmit}) => {
    const {user} = useAuth()
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const handleReveiwSubmit = (e) =>  {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const feedback = form.feedback.value
        
        onReviewSubmit(rating, title, feedback)
        setRating(0)
        form.reset()
    }
    return (
        <div>
            {/* Modal  */}
            <div
            className={`${
            modalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
            } w-full h-screen fixed top-0 left-0 z-50 bg-[#0000002a] flex items-center justify-center transition-all duration-300 `}>
            <div className="w-[90%] md:max-w-xl bg-[#ffffff] rounded-lg p-4 ">
            <div className="w-full flex items-end justify-end">
                <RxCross1
                className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] border border-primary/50 rounded-full transition-all duration-300 cursor-pointer"
                onClick={() => setModalOpen(false)}
                />
            </div>
            <div>
                <div className="flex items-center justify-center">
                    <img src={logo} alt="" className="h-12" />
                </div>
                {/* Content  */}
                <form onSubmit={handleReveiwSubmit}>
                <div className="max-w-lg mx-auto my-8">
                    <h3 className="mb-4 text-[24px] font-semibold text-[#333333] text-center">Your Room Experience</h3>
                    <p className="text-base font-normal text-light-black text-center">
                        Please rate your review below
                    </p>

                    <div
                        className="flex items-center sm:flex-row flex-col sm:space-x-12 w-full my-[20px] justify-center">
                        <div className="flex items-center space-x-4 justify-center mb-[10px]">
                            {[...Array(5)].map((_, index) => {
                                const starRating = index + 1;
                                return (
                                    <FaStar
                                        key={starRating}
                                        className={`cursor-pointer ${
                                            starRating <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                                        }`}
                                        size={26}
                                        onClick={() => setRating(starRating)}
                                        onMouseEnter={() => setHover(starRating)}
                                        onMouseLeave={() => setHover(null)}
                                    />
                                );
                            })}
                        </div>
                        <span className="text-lg font-medium text-light-black">{hover ? hover : rating }/5 stars</span>
                    </div>
                    {/* User name */}
                    <div className="my-4">
                        <label className="block text-[13px] mb-1 font-rubik font-medium text-[#5d5b58]">
                        Your Name
                        </label>
                        <input id="name" type="text" name="name" required readOnly value={user?.displayName}
                        className="w-full h-10 px-4 text-base transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary-light focus:outline-none bg-white bg-opacity-90" />
                    </div>
                    {/* Review Title  */}
                    <div className="my-4">
                        <label className="block text-[13px] mb-1 font-rubik font-medium text-[#5d5b58]">
                            Review Title
                        </label>
                        <input id="title" type="text" name="title" required placeholder="Review title here..."
                        className="w-full h-10 px-4 text-base font-medium transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary-light focus:outline-none bg-white bg-opacity-90" />
                    </div>

                    <label className="text-gray-500 ">Your feedback</label>
                    <textarea name="feedback" placeholder="My feedback!!"
                        className="w-full border-gray-400 bg-white font-medium text-base text-light-black resize-none outline-none focus:border-primary border rounded-md p-2 min-h-[100px]">
                    </textarea>
                    <button type="submit" className="py-2 text-base px-4 border bg-primary text-white font-medium hover:bg-secondary-black duration-300 rounded-md w-full mt-[10px]">Submit Review</button>
                </div>
                </form>
            </div>
            </div>
        </div>
    </div>
    );
};

export default ReviewModal;