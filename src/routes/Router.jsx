import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home/Home";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import MyBooking from "../pages/MyBooking/MyBooking";
import Rooms from "../pages/Rooms/Rooms";
import PrivateRoute from "./PrivateRoute";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
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
            },
            {
                path: "/auth/login",
                element: <Login/>
            },
            {
                path: "/auth/register",
                element: <Register/>
            }
        ]
    }
])

export default Router;