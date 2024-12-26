
const FAQ = ({faqData}) => {
    return (
        <div className="join join-vertical w-full my-10">
        <h3 className="p-3  text-secondary-black font-bold text-2xl mb-5">
            FAQ - General Question Answer
        </h3>

        {/* Defaul Faq  */}
        <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked/>
            <div className="collapse-title text-titleBlack text-[18px] font-medium ">
                How can I make a hotel reservation?
            </div>
            <div className="collapse-content">
            <p className=" text-black/65 text-lg dark:text-gray-400">
                You can make a reservation directly on our website by selecting your preferred room, dates, and completing the booking process.
            </p>
            </div>
        </div>
        {/* Faq from json data  */}
        {
            faqData?.map((faq, idx) =>  (
                <div key={idx} className="collapse collapse-arrow join-item border-base-300 border">
                    <input type="radio" name="my-accordion-4" />
                    <div className="collapse-title text-titleBlack text-[18px] font-medium ">
                        <span>{idx+1}. </span>
                        <span>{faq?.question}</span>
                    </div>
                    <div className="collapse-content">
                    <p className=" text-black/65 text-lg dark:text-gray-400">
                        {faq.answer}
                    </p>
                    </div>
                </div>
            ))
        }
        </div>
    );
};

export default FAQ;