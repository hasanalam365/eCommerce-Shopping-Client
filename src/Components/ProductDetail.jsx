import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { FaArrowRight, FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router-dom";
import '@smastrom/react-rating/style.css'
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRandomProductShow from "../hooks/useRandomProductShow";
import { Helmet } from "react-helmet-async";


const ProductDetail = () => {

    const productData = useLoaderData()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [quantity, setQuantity] = useState(1)

    const { imgUrl, title, price, rating, features, _id, category } = productData

    const [randomProductsData, isRelatedLoading] = useRandomProductShow(category)

    const { data: wishlistCheck, refetch } = useQuery({
        queryKey: ['wishlist-check', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/wishlist/check/${_id}/${user?.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleWishlistAdd = async (productData) => {

        if (user && user.email) {
            const wishlistAddInfo = {
                email: user?.email,
                productId: productData._id,
                product: productData,
                quantity: quantity
            }
            const res = await axiosSecure.put('/wishlist', wishlistAddInfo)
            if (res.data.upsertedCount === 1) {
                toast('added wishlist')
                refetch()

            }
        }
        else {
            Swal.fire({
                title: "You are not Logged In!!",
                text: "Please login after additing to the wishlist",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login', { state: location?.pathname })
                    refetch()
                }
            });
        }

    }


    const handleWishlistRemove = async (id) => {
        const res = await axiosPublic.delete(`/wishlist/remove/${id}/${user?.email}`)
        if (res.data.deletedCount === 1) {
            toast.warning('remove from wishlist')
            refetch()
        }
    }



    const handleAddtoCart = async (productData) => {

        if (user && user.email) {
            const addCartInfo = {
                email: user?.email,
                productId: productData._id,
                productData: productData,
                quantity: quantity
            }
            const res = await axiosSecure.post('/addToCart', addCartInfo)
            if (res.data.insertedId) {
                toast('added cart')
                refetch()

            }
            else {
                toast('added cart')
            }
        }
        else {
            Swal.fire({
                title: "You are not Logged In!!",
                text: "Please login after additing to the wishlist",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login', { state: location?.pathname })
                    refetch()
                }
            });
        }

    }

    const handleBuyAddtoCart = async (productData) => {

        if (user && user.email) {
            const addCartInfo = {
                email: user?.email,
                productId: productData._id,
                productData: productData,
                quantity: quantity
            }
            const res = await axiosSecure.post('/addToCart', addCartInfo)
            if (res.data.insertedId) {
                navigate('/dashboard/checkout')


            }
            else {

                navigate('/dashboard/checkout')
            }
        }
        else {
            Swal.fire({
                title: "You are not Logged In!!",
                text: "Please login after additing to the wishlist",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login', { state: location?.pathname })

                }
            });
        }
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)

    }
    const handleDiscrease = () => {
        if (quantity === 1) {
            return
        }
        setQuantity(quantity - 1)


    }

    //random related product show 
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5)
    }

    return (
        <div>
            <Helmet>
                <title>{productData.title} | {productData.category} | HMS </title>
            </Helmet>
            <div className=" bg-base-200 p-8 pt-20">
                <div className="flex flex-col md:flex-col lg:flex-row gap-5 md:gap-5 ">
                    <div className="flex-1">
                        <img
                            src={imgUrl}
                            className=" rounded-lg shadow-2xl w-full h-[250px] md:h-[320px] lg:h-[380px]" />
                    </div>
                    <div className="flex-1 space-y-2 p-2">
                        <h1 className="text-5xl font-bold">{title}</h1>
                        <p className="font-medium">Price:  <span className=" text-[#FF5722] ">
                            ${price}
                        </span>

                        </p>
                        <div>
                            <h5 className="font-medium">Features:</h5>
                            <ul>
                                {
                                    features.map((feature, idx) => <li key={idx} className="list-disc ml-8">{feature}</li>)
                                }
                            </ul>
                        </div>
                        <div className="flex gap-8 items-center">
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={rating}
                                readOnly

                            />
                            {wishlistCheck ? <button
                                onClick={() => handleWishlistRemove(productData._id)}
                                className="hover:scale-110 tooltip tooltip-right"
                                data-tip="add to wishlist"
                            >
                                <FaHeart className="text-[#FF5722] text-xl "></FaHeart>
                            </button>
                                :
                                <button
                                    onClick={() =>
                                        handleWishlistAdd(productData)

                                    }
                                    className="hover:scale-110 tooltip tooltip-right"
                                    data-tip="add to wishlist"
                                >
                                    <FaRegHeart className="text-[#FF5722] text-xl " />
                                    {/* <FaHeart className="text-[#FF5722] text-xl "></FaHeart> */}
                                </button>
                            }
                            <div className="flex items-center justify-center">
                                <button onClick={handleDiscrease} className="text-xl font-bold btn btn-sm bg-[#FF5722] text-white">-</button>
                                <input value={quantity} type="text"
                                    id="quantity"
                                    name="quantity" className="w-[60px] p-[2px]" readOnly />
                                <button onClick={handleIncrease} className="text-xl font-bold btn btn-sm bg-[#F29120] text-white">+</button>
                            </div>
                        </div>
                        <div className="flex gap-5 items-center ">
                            <button onClick={() => handleAddtoCart(productData)} className="btn text-white bg-[#F29120] hover:bg-[#d68324] mt-3">Add to Cart</button>
                            <button onClick={() => handleBuyAddtoCart(productData)} className="btn text-white bg-[#FF5722] hover:bg-[#ec5527] mt-3">Buy Now</button>
                        </div>
                    </div>

                </div>
                {
                    productData.description && <div className="p-4">

                        <p><span className="font-medium">Descripton:</span> {productData.description ? productData.description : ''}</p>


                    </div>
                }
                {/* Related Products Section */}
                <div className="bg-base-200  pt-10">
                    <h2 className="text-3xl font-bold mb-4">Related Products</h2>
                    <div className="divider"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {isRelatedLoading ? (
                            <div className="flex items-center justify-center ">
                                <div className="w-16 h-16 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
                            </div>
                        ) : (
                            shuffleArray(randomProductsData).map((product) => (
                                <Link to={`/product/${product._id}`} key={product._id} className="card card-compact bg-base-100 shadow-xl mt-5 ">
                                    <figure>

                                        <img className='w-full h-[150px] hover:scale-110' src={product.imgUrl} alt="" />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="text-lg font-medium">{product.title}</h2>
                                        <p className="font-medium">$ <span className="">{product.price}</span></p>

                                        <div className="flex justify-between">
                                            <Rating style={{ maxWidth: 100 }} value={product.rating} readOnly />
                                            <div className="flex gap-4">

                                                <FaArrowRight className="text-lg text-orange-600 hover:text-xl"></FaArrowRight>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;