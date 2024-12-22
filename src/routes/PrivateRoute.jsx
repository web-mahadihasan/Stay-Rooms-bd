import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {pathname} = useLocation()

    if(loading){
        return <p>loaing data...</p>
    }

    if(user && user.email) return children;


    return (
        <Navigate to={"/auth/login"} state={pathname}></Navigate>
    );
};

export default PrivateRoute;