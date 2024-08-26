import { Link, Outlet, useLocation } from "react-router-dom";
import Navber from "../Shared/Navber/Navber";
import Footer from "../Shared/Footer/Footer";
import { useEffect, useState } from "react";
import 'animate.css/animate.css'

import CheckOutBOxCart from "../Shared/CheckOutBOxCart";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const MainLayout = () => {

    const [openCart, setOpenCart] = useState(false)
    const axiosPublic = useAxiosPublic()

    const [search, setSearch] = useState('')


    const { data: allProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['allProducts-Search', search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-products?search=${search}`)
            return res.data
        },
        enabled: search !== '',
    })



    const handleSearchOff = () => {
        setSearch('')
    }



    return (

        <div className="container mx-auto relative">

            <div className="">
                <Navber setOpenCart={setOpenCart} openCart={openCart} setSearch={setSearch}></Navber>
            </div>
            <div>
                {allProducts.length > 0 &&
                    <div className="overflow-x-auto fixed top-16 z-50 bg-gray-300 h-full">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Photo</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProducts.map((product, idx) => (
                                    <tr key={product._id}>
                                        <th>{idx + 1}</th>
                                        <td>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={product.imgUrl} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{product.title}</td>
                                        <td>${product.price}</td>
                                        <td>
                                            <Link to={`/product/${product._id}`} onClick={handleSearchOff}>View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
            </div>

            <div className="  ">
                {openCart && <CheckOutBOxCart setOpenCart={setOpenCart} openCart={openCart}></CheckOutBOxCart>}
            </div>

            <div className="min-h-[calc(100vh-334px)]">
                <Outlet></Outlet>
            </div>
            <div className="h-[268px]">
                <Footer></Footer>
            </div>
        </div>


    );
};

export default MainLayout;