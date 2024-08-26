import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const location = useLocation()

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
        </div>
    }

    if (user) {
        return children
    }


    return <Navigate to='/login' state={location?.pathname || '/'} replace></Navigate>
};

export default PrivateRoute;