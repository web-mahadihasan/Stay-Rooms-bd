import Swal from "sweetalert2";
import LeafletMaps from "../../components/common/LeafletMaps";
import { AiOutlineArrowRight } from "react-icons/ai";

const Contact = () => {

    const handleContactSubmit = (e) =>  {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const message = Object.fromEntries(formData.entries())
        Swal.fire({
            title: "Message Send",
            text: "Your Message has been send successfully.",
            icon: "success"
        });
        form.reset()
    }
    return (
        <div>
            <div className="w-full h-[450px]">
                <div className="h-full w-full">
                    <LeafletMaps/>
                </div>
            </div>

            {/* Contact section  */}
            <section className="min-h-screen w-full bg-[#f2f4f8]">
                <div className="max-w-7xl mx-auto px-4 xl:px-0">
                    {/* Contact card  */}
                <div className="bg-white rounded-md p-0 md:p-6 xl:p-10 shadow-xl relative -top-36 grid grid-cols-1 gap-8 items-center lg:grid-cols-2">
                    <div>
                        <img src="https://i.ibb.co.com/kBYHnsQ/img-65-550x825.jpg" alt="" className="h-full rounded"/>
                    </div>
                    {/* Contact content  */}
                    <div className="w-full md:w-[90%] px-4 py-8 mx-auto">
                        <div>
                            <h3 className="text-3xl font-bold my-8 text-primary-black">Contact Information</h3>
                            <p className="text-light-black/90 font-semibold border-y-2 border-base-300 py-3">Address: 5 Ave lalbagh mor, Rangpur, Bangladesh</p>
                            <p className="text-light-black/90 font-semibold border-b-2 border-base-300 py-3">5 Ave lalbagh mor, Rangpur, Bangladesh</p>
                            <p className="text-light-black/90 font-semibold border-b-2 border-base-300 py-3">Email: info@stayrooms.com</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold my-10 text-primary-black">Let's start a conversation</h3>
                            <form onSubmit={handleContactSubmit}>
                                <div className="my-4">
                                    <input id="name" type="text" name="name" required placeholder="Your Name"
                                    className="w-full h-12 px-4 text-sm font-medium transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary-light focus:outline-none bg-white bg-opacity-90" />
                                </div>
                                <div className="my-4">
                                    <input id="email" type="email" name="email" required placeholder="Your Email"
                                    className="w-full h-12 px-4 text-sm font-medium transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary-light focus:outline-none bg-white bg-opacity-90" />
                                </div>
                                <div className="my-4">
                                    <input id="subject" type="text" name="subject" required placeholder="Your Subject"
                                    className="w-full h-12 px-4 text-sm font-medium transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary-light focus:outline-none bg-white bg-opacity-90" />
                                </div>
                                <textarea id="message" name="message" placeholder="Your Message here.."
                                    className="w-full bg-white border-gray-400 font-medium text-base text-light-black resize-none outline-none focus:border-primary border rounded-md p-2 min-h-[100px]">
                                </textarea>                    
                                <button type="submit" className="py-2 text-base px-4 border bg-primary text-white font-medium hover:bg-secondary-black duration-300 rounded-md w-full mt-[10px]">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Subcribe card  */}
                   <section className="py-24 border-b">
                    <div className="min-h-[320px] newsletter-shadow rounded-2xl flex flex-col gap-6 items-center justify-center bg-[#f8f2ee] page-title-bg">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-black text-center capitalize">Subscribe as a Newsletter for getting <br /> new offer & promotion</h3>
                        <div className="max-w-lg mx-auto w-full flex items-center bg-white border border-primary rounded-lg">
                            <input type="text" className="w-full px-4 bg-transparent p-2.5 border-none outline-none" name="" id="" placeholder="Your Email" />
                            <button className="flex items-center gap-2 bg-primary p-2.5 text-white font-semibold rounded-r-md">
                                <span>Subscribe</span>
                                <span><AiOutlineArrowRight size={20}/> </span>
                            </button>
                        </div>
                    </div>
                    </section> 
                </div>
            </section>
        </div>
    );
};

export default Contact;