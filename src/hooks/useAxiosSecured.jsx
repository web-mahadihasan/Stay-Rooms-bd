import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const axiosSecured = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
})

const useAxiosSecured = () => { 
    const {logOutUser} = useAuth()
    const navigate = useNavigate()

    useEffect(() =>  {
        axiosSecured.interceptors.response.use(res =>  {
            return res
        }, async (error) =>  {
            console.log(error)
            if(error.response.status ===   401 || error.response.status ===   403){
                logOutUser()
                navigate("/auth/login")
            }
        })
    },[logOutUser, navigate])
    return axiosSecured;
};

export default useAxiosSecured;