import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
const useAxiosSecure = () => {

    const navigate = useNavigate()
    const { signOutUser } = useAuth()

    axiosSecure.interceptors.request.use(function (config) {


        const token = localStorage.getItem('access-token')
        // console.log('requ stopeed', token)

        config.headers.authorization = `Bearer ${token}`

        return config;
    }, function (error) {
        return Promise.reject(error)
    })

    //intercepts 401 abd 403 status
    axiosSecure.interceptors.response.use(function (response) {
        // console.log('api responce:', response)
        return response

    }, async (error) => {

        // console.log('status error:', error)
        // console.log('api error::', error.response.status)
        const status = error.response.status
        // console.log('status error:', status)

        //for 401 and 403 logout the user and move the user to the login page
        if (status === 401 || status === 403) {
            await signOutUser()
            navigate('/login')

        }

        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;