import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useCartList = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data = [], refetch, isLoading } = useQuery({
        queryKey: ['cardList'],
        queryFn: async () => {
            const res = await axiosPublic(`/addToCart/${user.email}`)
            return res.data
        }
    })

    return [data, refetch, isLoading]
};

export default useCartList;