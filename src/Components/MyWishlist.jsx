import { MdDeleteForever } from "react-icons/md";
import useWishlist from "../hooks/useWishlist";
import { FiShoppingCart } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { Helmet } from "react-helmet-async";

const MyWishlist = () => {
    const [wishlistData, refetch, isLoading] = useWishlist()
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()


    const handleDeleteWishlist = async (id) => {
        const res = await axiosPublic.delete(`/wishlist/delete/${id}`)
        if (res.data.deletedCount === 1) {
            toast.error('This item has been delete from wishlist')
            refetch()
        }
    }

    const handleAddCart = async (product) => {
        const addCartInfo = {
            email: user?.email,
            productId: product.product._id,
            productData: product.product,
            quantity: product.quantity
        }

        await axiosPublic.post('/addToCart', addCartInfo)
        toast('added cart')
        await axiosPublic.delete(`/wishlist/delete/${product._id}`)
        refetch()
    }

    const handleIncrease = async (productId) => {
        const res = await axiosPublic.put(`/whishlist/quantity-plus/${productId}`)
        if (res.data.modifiedCount === 1) {
            refetch()
        }
    }

    const handleDiscrease = async (productId) => {
        const res = await axiosPublic.put(`/whishlist/quantity-minus/${productId}`)
        if (res.data.modifiedCount === 1) {
            refetch()
        }
    }

    return (
        <div className="md:w-full mx-auto mt-8">
            <Helmet>
                <title>Wishlist | Dashboard | HMS </title>
            </Helmet>
            <div>
                <h4 className="text-xl font-medium"> Wishlist:</h4>
            </div>
            {isLoading ? (
                <div className="flex items-center justify-center ">
                    <div className="w-16 h-16 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
                </div>
            ) : wishlistData.length === 0 ? <div className="mt-10 text-center text-2xl font-medium">Your wishlists is empty!</div> :

                <div className="flex flex-col gap-3 mt-2 p-2">
                    {
                        wishlistData.map(cart => <div key={cart._id} className="flex items-center justify-center  gap-2  border-2 border-gray-100 p-2">

                            <div className="">
                                <img src={cart.product.imgUrl} className="w-[70px] h-[70px] rounded-lg" alt="" />
                            </div>
                            <div className="flex flex-col justify-between w-[75%]">
                                <div className="flex justify-between">
                                    <h4 className="font-medium w-[85%]">{cart.product.title}</h4>
                                    <div className="flex flex-row gap-3">
                                        <button onClick={() => handleDeleteWishlist(cart._id)}>
                                            <MdDeleteForever className="text-xl hover:scale-125 hover:text-red-600" />
                                        </button>
                                        <button onClick={() => handleAddCart(cart)}>
                                            <FiShoppingCart className="text-xl hover:scale-125 hover:text-[#FF5722]"></FiShoppingCart>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <h5 className="text-[#40BFFF]">${cart.product.price * cart.quantity}</h5>
                                    <div className="flex items-center justify-center gap-2 ">
                                        <CiSquareMinus onClick={() => handleDiscrease(cart._id)} className="text-2xl" />
                                        <h5>{cart.quantity}</h5>
                                        <CiSquarePlus onClick={() => handleIncrease(cart._id)} className="text-2xl" />

                                    </div>
                                </div>
                            </div>

                        </div>)
                    }
                </div>
            }
        </div>
    );
};

export default MyWishlist;