import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {

    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: userData = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`)
            return res.data
        }
    })


    return [userData, refetch]
};

export default useUser;