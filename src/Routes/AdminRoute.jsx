import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()


    if (loading || isAdminLoading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
        </div>
    }

    if (user || isAdmin) {
        return children
    }


    return <Navigate to='/login' state={location?.pathname || '/'} replace></Navigate>
};

export default AdminRoute;