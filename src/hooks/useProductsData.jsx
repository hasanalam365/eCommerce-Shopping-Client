import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useProductsData = () => {

    const axiosPublic = useAxiosPublic()


    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic('/products')
            return res.data
        }
    })

    return [products, isLoading]
};

export default useProductsData;