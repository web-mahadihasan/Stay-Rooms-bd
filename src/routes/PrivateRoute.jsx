import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/common/LoadingSpinner";

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {pathname} = useLocation()

    if(loading){
        return <LoadingSpinner/>
    }

    if(user) return children;


    return (
        <Navigate to={"/auth/login"} state={pathname} replace></Navigate>
    );
};

export default PrivateRoute;