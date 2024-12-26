import { FcGoogle } from "react-icons/fc";
import register from "../../assets/lottie/register.json"
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router";
import { PiEyeClosedBold } from "react-icons/pi";
import { useState } from "react";
import { VscEyeClosed } from "react-icons/vsc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Register = () => {
    const {registerNewUser,loginWithGoogle, setUser, updataUser} = useAuth();
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [error, setError] = useState({})
    const [imageUrl, setImageUrl] = useState("");
    const location = useLocation()
    const from = location?.state ? location.state : "/"
    const [loading, setLoading] = useState({})

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const navigate = useNavigate()

     //    Handle Image upload
    const handleImageUpload = async (e) => {
        setLoading({
            ...loading,
            imgUpload: true
        })
        const imageLink = e.target.files[0];
        const imageData = new FormData();
        imageData.append("image", imageLink);
        try {
            const {data} = await axios.post(`https://api.imgbb.com/1/upload?key=176775b308da684d8b761f7bdfe641cd`, imageData)
            setImageUrl(data?.data?.display_url)
            setLoading({
                ...loading,
                imgUpload: false
            })
        } catch (error) {
            toast.error('Image upload failed')
        }
        
    };
    
    const handleUserRegister = async (e) =>  {
        e.preventDefault()

        const form = e.target;
        const data = new FormData(form);
        const name = data.get("name");
        const email = data.get("email");
        const password = data.get("password");
        const repassword = data.get("repassword");


        const rightPass = passwordRegex.test(password);
        const updateData = { displayName: name, photoURL: imageUrl };
        
        if(!rightPass){
            return setError({...error, wrongPass: "Password should be at least one uppercase, one lowercase, one number and one special character with at least 8 digits"})
        }
        if(password !==   repassword) {
            return setError({...error, wrongRePass: "Your password don't matched"})
        }

        setError({...error, wrongRePass: null, wrongPass: null})
        try {
            setLoading({
                ...loading, 
                registration: true
            })
            const result = await registerNewUser(email, password)
            setUser(result.user)
            console.log(result.user)
            const update = await updataUser(updateData)
            toast.success("Successfully registration done")
            navigate(from)
            setLoading({
                ...loading, 
                registration: false
            })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Registration Failed",
                text: "Something went wrong! Try again",
            });
        }
    }
    const handleGoogleLogin = async () =>  {
        try {
            const result = await loginWithGoogle()

            toast.success("Successfully Log in")
            setUser(result.user)
            navigate(from)
        } catch (err) {
            toast.error("Failed to Login")
            console.log(err)
        }
    }
    if(loading?.registration) return <LoadingSpinner/>
    return (
        <div className="w-full min-h-screen">
            <div className="max-w-6xl mx-auto px-4 xl:px-0 flex items-center justify-between flex-col md:flex-row min-h-screen gap-8">
                <div className="flex-1 text-center space-y-2 order-2 md:order-1">
                    <p className="font-semibold text-primary-dark dark:text-white dark:text-white">Register</p>
                    <h3 className="text-4xl font-bold text-primary-black dark:text-white">Start Journey Today</h3>
                    <p className="font-medium text-light-black dark:text-white/85 dark:text-white/85">Access to all features. No credit card required.</p>

                    <div className="pt-6">
                        <button onClick={handleGoogleLogin} className="w-full lg:w-3/4 mx-auto flex items-center justify-center p-2 border border-primary rounded-md gap-3 font-medium text-primary-black dark:text-white">
                            <span><FcGoogle size={22} /></span>
                            <span>Register With Google</span>
                        </button>
                        <div className="divider w-full lg:w-3/4 mx-auto my-5 text-sm text-light-black dark:text-white/85 dark:text-white/85">OR Login With Email</div>
                        {/* Form  */}
                        <form onSubmit={handleUserRegister} className="space-y-2">
                            {/* Name */}
                            <div className="w-full lg:w-3/4 mx-auto">
                                <label className="block text-base text-left mb-1 font-medium text-light-black dark:text-white/85 dark:text-white/85">Full Name</label>
                                <input
                                id="name" type="text" name="name" required placeholder="John Doe"
                                className="w-full h-11 px-4 text-base transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary/40 focus:outline-none bg-white bg-opacity-90"/>
                            </div>
                            {/* Email  */}
                            <div className="w-full lg:w-3/4 mx-auto">
                                <label className="block text-base text-left mb-1 font-medium text-light-black dark:text-white/85 dark:text-white/85">Email</label>
                                <input
                                id="email" type="email" name="email" required placeholder="john@example.com"
                                className="w-full h-11 px-4 text-base transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary/40 focus:outline-none bg-white bg-opacity-90"/>
                            </div>
                            {/* {
                                error.wrongEmail && <p className="text-sm text-red-600 text-left w-full lg:w-3/4 mx-auto">{error.wrongEmail}</p>
                            } */}
                            {/* UserName */}
                            <div className="w-full lg:w-3/4 mx-auto">
                                <label className="block text-base text-left mb-1 font-medium text-light-black dark:text-white/85 dark:text-white/85">Profile Photo</label>
                                <input
                                onChange={handleImageUpload}
                                id="image" type="file" name="username" required placeholder="john_doe1234"
                                className="w-full file-input shadow border-none outline-none bg-white/75"/>
                            </div>
                            {/* Password  */}
                            <div className="w-full lg:w-3/4 mx-auto relative">
                                <label className="block text-base text-left mb-1 font-medium text-light-black dark:text-white/85 dark:text-white/85">Password</label>
                                <input
                                id="password" type={showPassword? "text": "password"} name="password" required placeholder="●●●●●●"
                                className="w-full h-11 px-4 text-base transition-all  border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary/40 focus:outline-none bg-white bg-opacity-90"/>
                                <div onClick={() =>  setShowPassword(!showPassword)} className="absolute right-3 top-10 cursor-pointer">
                                    {showPassword ? <span><VscEyeClosed size={20} /></span> : <span><PiEyeClosedBold size={20} /></span>}
                                </div>
                            </div>
                            {
                                error.wrongPass && <p className="text-sm text-red-600 text-left w-full lg:w-3/4 mx-auto">{error.wrongPass}</p>
                            }
                            {/* Repeat Password  */}
                            <div className="w-full lg:w-3/4 mx-auto relative">
                                <label className="block text-base text-left mb-1 font-medium text-light-black dark:text-white/85 dark:text-white/85">Repeat Password</label>
                                <input
                                id="repassword" type={showRePassword? "text": "password"} name="repassword" required placeholder="●●●●●●"
                                className="w-full h-11 px-4 text-base transition-all  border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary/40 focus:outline-none bg-white bg-opacity-90"/>
                                <div onClick={() =>  setShowRePassword(!showRePassword)} className="absolute right-3 top-10 cursor-pointer">
                                    {showRePassword ? <span><VscEyeClosed size={20} /></span> : <span><PiEyeClosedBold size={20} /></span>}
                                </div>
                            </div>
                            {
                                error.wrongRePass && <p className="text-sm text-red-600 text-left w-full lg:w-3/4 mx-auto">{error.wrongRePass}</p>
                            }

                            {/* Term and conditions  */}
                            <div className="w-full lg:w-3/4 mx-auto flex items-center">
                                <label onChange={() =>  setChecked(!checked)} className="label cursor-pointer">
                                    <input type="checkbox" className="checkbox checkbox-sm mr-2" />
                                    <span className="text-light-black dark:text-white/85 dark:text-white/85">Agree with our <span className="text-primary">terms and policy</span></span>
                                </label>
                            </div>
                            <div className="w-full lg:w-3/4 mx-auto">
                                {
                                    loading?.imgUpload ? <button type="submit" disabled className="w-full p-2 border border-primary bg-primary rounded-md font-medium text-white hover:bg-secondary-black hover:border-secondary-black focus:bg-secondary-black focus:border-secondary-black duration-300 flex items-center gap-2 justify-center"><span className="loading loading-spinner text-neutral"></span> Image uploading...</button>
                                    : <button type="submit" disabled={!checked} className="w-full p-2 border border-primary bg-primary rounded-md font-medium text-white hover:bg-secondary-black hover:border-secondary-black focus:bg-secondary-black focus:border-secondary-black duration-300 ">Continue with Email</button>
                                }
                                
                            </div>
                        </form>
                        <div className="my-4">
                            <p className="font-medium text-light-black dark:text-white/85 dark:text-white/85">Already have an Account? <Link to={"/auth/login"} className="text-blue-600 hover:text-primary-black duration-300">Login here</Link></p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 order-1 md:order-2">
                    <Lottie animationData={register}/>
                </div>
            </div>
        </div>
    );
};

export default Register;