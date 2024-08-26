import { FaCircleArrowRight } from "react-icons/fa6";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useCartList from "../hooks/useCartList";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import useAuth from "../hooks/useAuth";


const CheckOutBOxCart = ({ setOpenCart, openCart }) => {

    const [data, refetch] = useCartList()
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const totalPrices = data.reduce((total, product) => total + (product.productData.price * product.quantity), 0)

    const handleDelete = async (_id) => {

        const res = await axiosPublic.delete(`/addToCart/${_id}/${user.email}`)
        if (res.data.deletedCount === 1) {
            toast('Deleted from cart')
            refetch()
        }

    }


    const handleIncrease = async (productId) => {


        const res = await axiosPublic.put(`/quantity-plus/${productId}`)
        if (res.data.modifiedCount === 1) {
            refetch()
        }
    }
    const handleDiscrease = async (productId) => {

        const res = await axiosPublic.put(`/quantity-minus/${productId}`)
        if (res.data.modifiedCount === 1) {
            refetch()
        }
    }

    return (
        <div className={`absolute right-0 top-0  z-30  md:fixed`}>
            <div className="flex  flex-col  p-3  bg-white h-[550px] w-[425px]">
                <div className="flex items-center justify-end ">
                    <button onClick={() => setOpenCart(false)} className="btn">
                        <FaCircleArrowRight />
                    </button>
                </div>
                <div className="font-medium text-lg flex items-center justify-between">
                    <h5>Shopping Cart</h5>
                    <h5 className="text-orange-500">Items: {data.length}</h5>
                </div>
                <div className="divider"></div>

                <div className="flex flex-col gap-3 mt-2 p-2 overflow-x-auto bg-base-200">
                    {
                        data.map(cart => <div key={cart._id} className="flex items-center justify-center  gap-2  border-2 border-gray-100 p-2">

                            <div className="">
                                <img src={cart.productData.imgUrl} className="w-[70px] h-[70px] rounded-lg" alt="" />
                            </div>
                            <div className="flex flex-col justify-between w-[75%]">
                                <div className="flex justify-between">
                                    <h4 className="font-medium w-[85%]">{cart.productData.title}</h4>
                                    <FiTrash onClick={() => handleDelete(cart._id)} className="text-xl md:text-2xl hover:text-red-600 hover:scale-110" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <h5 className="text-[#40BFFF]">${cart.productData.price * cart.quantity}</h5>
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

                {/* <div className="divider divide-dashed"></div> */}
                <div className="text-center font-semibold boder border-2 mt-1 mb-1 border-dashed p-2">
                    <h4>Total: $ {totalPrices} </h4>
                </div>
                <Link to="/dashboard/checkout">
                    <button onClick={() => setOpenCart(false)} className="text-white bg-orange-600 p-4 w-full font-semibold rounded-lg">Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default CheckOutBOxCart;