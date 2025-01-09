import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home/Home";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import MyBooking from "../pages/MyBooking/MyBooking";
import Rooms from "../pages/Rooms/Rooms";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/AboutUs/About";
import Contact from "../pages/Contact/Contact";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import MyProfile from "../pages/MyProfile/MyProfile";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/room-details/:id",
                element: <PrivateRoute> <RoomDetails/> </PrivateRoute>,
                loader: () =>  fetch("/faq.json")
            },
            {
                path: "/my-bookings",
                element: <PrivateRoute> <MyBooking/> </PrivateRoute>,
            },
            {
                path: "/rooms",
                element: <Rooms/>,
                loader: () =>  fetch("/faq.json")
            },
            {
                path: "/auth/login",
                element: <Login/>
            },
            {
                path: "/auth/register",
                element: <Register/>
            },
            {
                path: "/auth/forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "/about-us",
                element: <About/>
            },
            {
                path: "/contact-us",
                element: <Contact/>
            },
            {
                path: "/my-profile",
                element: <PrivateRoute><MyProfile/></PrivateRoute>
            }
        ]
    }
])

export default Router;