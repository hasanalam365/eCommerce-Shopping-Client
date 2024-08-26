import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useRandomProductShow = (category) => {

    const axiosPublic = useAxiosPublic()

    const { data: randomProductsData, isLoading: isRelatedLoading } = useQuery({
        queryKey: ['random-show-products', category],
        queryFn: async () => {
            const res = await axiosPublic.get(`/products/category/${category}`)
            return res.data
        },
        enabled: !!category
    })

    return [randomProductsData, isRelatedLoading]
};

export default useRandomProductShow;