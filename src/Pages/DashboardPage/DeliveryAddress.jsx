import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const DeliveryAddress = () => {

    const [select, setSelect] = useState(1)
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const location = useLocation()
    const { orderId, orderInfo } = location.state || {}
    const navigate = useNavigate()

    const { data: userData } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`)
            return res.data
        }
    })


    const handleAddress = async (e) => {
        e.preventDefault()
        const form = e.target;
        const name = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const secondPhone = form.secondNumber.value;
        const division = form.division.value;
        const district = form.district.value;
        const thana = form.thana.value;
        const address = form.address.value;
        const currentLocation = select === 1 ? 'Home' : 'Office'

        const allAddress = { name, phone, email, secondPhone, division, district, thana, address, currentLocation, orderId }
        const orderStatus = {
            orderId: orderId,
            email: email,
            status: 'pending',
            orderDate: new Date().toLocaleDateString(),
            orderTime: new Date().toLocaleTimeString()
        }
        const orderPost = await axiosPublic.post('/orders', orderInfo)

        if (orderPost.data.insertedId) {
            const res = await axiosPublic.put(`/orders/${orderId}`, allAddress)

            if (res.data.modifiedCount === 1) {
                toast('Order Confirmed')

                await axiosPublic.post('/orderStatus', orderStatus)
                await axiosPublic.delete(`/mycarts-delete/${user.email}`)

                navigate('/')

            }
        }
    }


    return (
        <div>
            <Helmet>
                <title>Delivery Address | HMS </title>
            </Helmet>
            <section className="  dark:text-gray-900 w-[95%] md:mt-5 lg:mt-0 mx-auto bg-gray-200">
                <form onSubmit={handleAddress} className="container flex flex-col mx-auto space-y-12">
                    <fieldset className=" p-6 rounded-md shadow-sm dark:bg-gray-50">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="fullname" className="font-medium">Full Name</label>
                                <input id="fullName" name="name" type="text" placeholder="Full Name" defaultValue={userData?.displayName} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="phone" className="font-medium">Phone</label>
                                <input id="phone" type="text" name="phone" placeholder="Phone Number" defaultValue={userData?.phone} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="alternative phone number" className="font-medium">Alternative Phone</label>
                                <input id="secondNumber" type="text"
                                    name="secondNumber" defaultValue={userData?.alterPhone} placeholder="Alternative Phone" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Division" className="font-medium">Division</label>
                                <input id="division" type="text"
                                    name="division" placeholder="Division" defaultValue={userData?.division} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="District" className="font-medium">District</label>
                                <input id="district" type="text"
                                    name="district" placeholder="District" defaultValue={userData?.district} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Thana" className="font-medium">Thana</label>
                                <input id="thana" type="text"
                                    name="thana" placeholder="Thana" defaultValue={userData?.thana} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" />
                            </div>
                            <div className="col-span-full ">
                                <label htmlFor="fullname" className="font-medium">Email</label>
                                <input id="fullName" name="email" type="text" value={userData?.email} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" />
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="address" className="font-medium">Address</label>
                                <input id="address" type="text"
                                    name="address" placeholder="Building/House/Street" defaultValue={userData?.address} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300  p-2" />
                            </div>

                        </div>
                        <div className="flex gap-1 mt-4">
                            <div onClick={() => setSelect(1)} className={`border-2  p-4 max-w-max rounded-lg ${select === 1 ? 'border-green-400 font-medium' : 'border-gray-300'}`}>
                                Home
                            </div>
                            <div onClick={() => setSelect(2)} className={`border-2 p-4  max-w-max rounded-lg ${select === 2 ? 'border-green-400 font-medium' : 'border-gray-300 '}`}>
                                Office
                            </div>
                        </div>
                        <div className="mt-2">
                            <button className="btn btn-secondary w-full">Confirm</button>
                        </div>
                    </fieldset>

                </form>
            </section>
        </div>
    );
};

export default DeliveryAddress;