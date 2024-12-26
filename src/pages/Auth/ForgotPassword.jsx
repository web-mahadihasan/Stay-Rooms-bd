import login from "../../assets/lottie/loginLottie.json"
import Lottie from "lottie-react";
import { Link, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const ForgotPassword = () => {
    const navigate = useNavigate()
    const {resetPassword} = useAuth()

    const handleResetPassword = async (e) =>  {
        e.preventDefault()
        const email = e.target.email.value
        try {            
            const result = await resetPassword(email)
            Swal.fire({
                 icon: "success",
                 title: "Reset Email Send",
                 text: "A reset email was sent youre inbox. please check inbox!",
             });
             navigate("/auth/login")
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to send Reset Email",
                text: "Sorry! When send reset email facting a problem! try again",
            });
        }

    }

    return (
        <div className="w-full min-h-screen">
            <div className="max-w-6xl mx-auto px-4 xl:px-0 flex items-center justify-between flex-col md:flex-row min-h-screen gap-8">
                <div className="flex-1 text-center space-y-2 order-2 md:order-1">
                    <p className="font-semibold text-primary-dark dark:text-white">Welcomoe Back</p>
                    <h3 className="text-4xl font-bold text-primary-black dark:text-white">Recover Access</h3>

                    <div className="pt-6">
                        
                        {/* Form  */}
                        <form onSubmit={handleResetPassword} className="space-y-3">
                            {/* Email  */}
                            <div className="w-full lg:w-3/4 mx-auto">
                                <label className="block text-base text-left mb-1 font-medium text-light-black dark:text-white/85 dark:text-white/85">Email</label>
                                <input
                                id="email" type="email" name="email" required placeholder="john@example.com"
                                className="w-full h-11 px-4 text-base transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary/40 focus:outline-none bg-white bg-opacity-90"/>
                            </div>
                            <div className="w-full lg:w-3/4 mx-auto py-4">
                                <button  type="submit" className="w-full p-2 border border-primary bg-primary rounded-md font-medium text-white hover:bg-secondary-black hover:border-secondary-black focus:bg-secondary-black focus:border-secondary-black duration-300 ">Send Reset Email</button>
                            </div>
                        </form>
                        <div className="my-8">
                            <p className="font-medium text-light-black dark:text-white/85 dark:text-white/85">Remember password? <Link to={"/auth/login"} className="text-blue-600 hover:text-primary-black dark:text-white dark:hover:text-primary duration-300">Login here</Link></p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 order-1 md:order-2">
                    <Lottie animationData={login}/>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;