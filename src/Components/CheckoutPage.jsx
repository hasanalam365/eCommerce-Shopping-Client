import useCartList from "../hooks/useCartList";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const CheckoutPage = () => {

    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [orderId, setOrderId] = useState('');

    const { user } = useAuth()
    const [data, refetch, isLoading] = useCartList()
    const navigate = useNavigate()
    const totalPrices = data.reduce((total, product) => total + (product.productData.price * product.quantity), 0)

    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    const axiosPublic = useAxiosPublic()

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let createId = ''

    for (let i = 0; i < 8; i++) {
        const randomCreateId = Math.floor(Math.random() * characters.length)

        createId += characters[randomCreateId]
    }

    useEffect(() => {

        setOrderId(createId);
    }, []);


    const handleCheckboxChange = (index) => {
        setSelectedCheckbox(index);
    };

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

    const handleDelete = async (_id) => {
        const res = await axiosPublic.delete(`/addToCart/${_id}/${user.email}`)
        if (res.data.deletedCount === 1) {
            toast('Deleted from cart')
            refetch()
        }
    }


    const handleConfirm = async () => {
        const allProduct = data.map(product => ({
            ...product.productData,
            quantity: product.quantity,
        }));

        const orderInfo = {
            paymentType: selectedCheckbox,
            orderId: orderId,
            totalPrices: totalPrices + 20,
            date: date,
            time: time,
            allProducts: allProduct,

        }
        navigate('/dashboard/address', { state: { orderId, orderInfo } });
    }


    return (
        <div className=" flex flex-col md:flex-row lg:flex-row gap-5 mt-3">
            <Helmet>
                <title>Checkout | HMS </title>
            </Helmet>
            <div className="w-full md:w-[60%] lg:w-[60%]  ">
                <div className="bg-orange-600 text-center rounded-xl ">
                    <h3 className="text-lg font-semibold text-white p-2">Shopping Cart</h3>
                </div>
                {
                    isLoading ? (
                        <div className="flex items-center justify-center mt-5">
                            <div className="w-12 h-12 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="mt-10 text-center text-xl font-medium">Your cart is empty!!!!!</div>
                    )
                        :

                        <div className="flex flex-col gap-3 mt-2 p-2">
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
                }

            </div>
            <div className="w-full md:w-[40%] lg:w-[40%]  bg-gray-200 mt-4 md:mt-0 p-4">
                <div className="bg-orange-600 text-center  ">
                    <h3 className="text-lg font-semibold md:font-medium text-white p-2 flex items-center justify-center ">OrderId <span>- {orderId}</span> </h3>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <p className=" font-medium">Date:</p>
                    <p>{date}</p>
                </div>
                <div className="flex items-center justify-between mt-1">
                    <p className=" font-medium">Time:</p>
                    <p>{time}</p>
                </div>
                <div className="divider"></div>
                <div>
                    <div>
                        <div className="form-control">
                            <label className="flex items-center gap-5 mb-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCheckbox === 'Cash On Delivery'}
                                    onChange={() => handleCheckboxChange('Cash On Delivery')}
                                    className="checkbox checkbox-info"
                                />

                                <span className="font-medium">Cash On Delivery</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="flex items-center gap-5 mb-2">

                                <input
                                    type="checkbox"
                                    checked={selectedCheckbox === 'bkash'}
                                    onChange={() => handleCheckboxChange('bkash')}
                                    className="checkbox checkbox-info"
                                />

                                <img className="h-[60px] w-[35%] md:w-3/4 lg:w-3/4" src="https://i.ibb.co/Wnqn0QP/bkash-payment-logo-removebg-preview.png" alt="bkash logo" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="flex items-center gap-5 mb-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCheckbox === 'nagad'}
                                    onChange={() => handleCheckboxChange('nagad')}
                                    className="checkbox checkbox-info"
                                />
                                <img className="h-[60px] w-[35%]" src="https://i.ibb.co/kyMbzf0/Nagad-Logo-2024-removebg-preview.png" alt="nagad logo" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="flex items-center gap-5 mb-2">
                                <input
                                    type="checkbox"
                                    checked={selectedCheckbox === 'stripe'}
                                    onChange={() => handleCheckboxChange('stripe')}
                                    className="checkbox checkbox-info"
                                />

                                <img className="h-[60px] w-[35%]" src="https://i.ibb.co/MgNmKRQ/stripe-removebg-preview.png" alt="stripe logo" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className=" border-2 border-white mt-1 mb-1 border-dashed p-2">
                    <h4 className="flex items-center justify-between">Sub total:  <span>${totalPrices}</span> </h4>
                    <h4 className="flex items-center justify-between">Shipping fee:<span>$20</span> </h4>
                    <hr />
                    <h4 className="flex items-center justify-between font-medium">Total:  <span>${totalPrices + 20}</span> </h4>
                </div>
                <div onClick={handleConfirm} className="mt-4 text-center ">
                    <button className="btn bg-orange-600 p-2 rounded-xl w-full text-white font-medium ">Confirm Order</button>
                </div>
            </div>
        </div>

    );
};

export default CheckoutPage;