
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const ViewOrderDetails = () => {

    const [productIds, setProductIds] = useState([]);
    const LoaderData = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const [data, setData] = useState(LoaderData);
    const navigate = useNavigate()

    const [quantities, setQuantities] = useState(
        data.allProducts.reduce((acc, product) => {
            acc[product.productId] = product.quantity;
            return acc;
        }, {})
    );


    useEffect(() => {
        setData(LoaderData);
    }, [LoaderData]);

    useEffect(() => {
        if (data?.allProducts) {
            const ids = data.allProducts.map(product => product.productId);
            setProductIds(ids);
        }
    }, [data]);


    const { data: stockCount } = useQuery({
        queryKey: ['stock-count'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/stockProductCount/${productIds}`)
            return res.data
        }
    })


    const { data: selectedOrders, refetch } = useQuery({
        queryKey: ['selectedOrder'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/selectedOrder/${LoaderData.orderId}`)
            return res.data
        }
    })
    const totalPrice = selectedOrders?.reduce((sum, product) => sum + product.totalPrices, 0);

    const handleSelectOrder = async (product, index) => {

        const selectedOrders = {
            orderId: LoaderData.orderId,
            product: {
                _id: product._id,
                category: product.category,
                features: product.features,
                imgUrl: product.imgUrl,
                price: product.price,
                productId: product.productId,
                quantity: quantities[product.productId],
                rating: product.rating,
                stock: product.stock,
                title: product.title,

            },
            totalPrices: product.price * quantities[product.productId]

        }

        const stockDiscrease = quantities[product.productId]

        try {

            const res = await axiosSecure.post('/selectedOrder', selectedOrders)
            if (res.data.insertedId) {
                await axiosSecure.patch(`/stockProductCount/${product.productId}/${stockDiscrease}`)
                const res = await axiosSecure.delete(`/view-order-delete/${LoaderData.
                    orderId}/${index}`)

                if (res.data.modifiedCount === 1) {

                    setData((prevData) => ({
                        ...prevData,
                        allProducts: prevData.allProducts.filter((_, idx) => idx !== index),
                    }));
                    refetch()
                    toast('selected this product')
                }

            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleOrderDelete = (index) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this orders!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/view-order-delete/${LoaderData.
                    orderId}/${index}`)

                if (res.data.modifiedCount === 1) {
                    toast.error('Order has been deleted')
                    setData((prevData) => ({
                        ...prevData,
                        allProducts: prevData.allProducts.filter((_, idx) => idx !== index),
                    }));
                }

            }
        });
    }

    const handleOrderConfirm = async (e) => {
        e.preventDefault()
        const orderProducts = selectedOrders?.map(order => order)
        const form = e.target;
        const name = form.name.value;
        const orderId = form.orderId.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const secondPhone = form.secondPhone.value;
        const division = form.division.value;
        const district = form.district.value;
        const thana = form.thana.value;
        const fullAddress = form.fullAddress.value;
        const currentDelivery = form.currentDelivery.value;
        const orderTimeDate = form.orderTimeDate.value;
        const paymentType = form.paymentType.value;
        const totalPrices = form.totalPrices.value;

        const status = 'Confirmed'

        const customerInfo = { name, orderId, email, phone, secondPhone, division, district, thana, fullAddress, currentDelivery, orderTimeDate, paymentType }

        const orderAllDetails = {
            orderId,
            orderProducts,
            customerInfo,
            totalPrices,
            status
        }

        try {
            const res = await axiosSecure.post('/confirmOrder', orderAllDetails)
            if (res.data.insertedId) {

                await axiosSecure.delete(`/pendingOrders/${LoaderData._id}`)
                await axiosSecure.delete(`/selectedOrders/${orderId}`)
                await axiosSecure.patch(`/orderStatus/${orderId}`)
                toast('Order Confirmed')
                navigate('/dashboard/all-orders')

            }
        }
        catch (error) {
            console.log(error.message)
        }

    }


    const handleQuantityChange = (productId, newQuantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [productId]: newQuantity
        }));

    };

    return (
        <div>
            <Helmet>
                <title>View Order Details | Admin | HMS </title>
            </Helmet>
            <section className=" mt-2 md:mt-10">
                <div action="" className="container flex flex-col md:flex-row gap-7 mx-auto ">
                    <div>
                        <div className="text-center">
                            <h4 className="text-3xl font-semibold mb-5">Order  Information</h4>

                            <div className="overflow-x-auto">
                                <table className="table">

                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Photo</th>
                                            <th>Name</th>
                                            <th>ProductId</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                            <th>Stock</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            data?.allProducts?.map((product, idx) => <tr key={idx}>
                                                <td>
                                                    {idx + 1}

                                                </td>
                                                <td>
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={product.imgUrl}
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {product.title}
                                                </td>
                                                <td>
                                                    {product.productId}
                                                </td>
                                                <td>
                                                    ${product.price}
                                                </td>

                                                <td>
                                                    <input
                                                        type="number"
                                                        value={isNaN(quantities[product.productId]) ? 0 : quantities[product.productId]}
                                                        className="w-[40px] bg-gray-200 p-1"
                                                        onChange={(e) =>
                                                            handleQuantityChange(product.productId, parseInt(e.target.value))
                                                        }
                                                    />
                                                </td>
                                                <td>${product.price * quantities[product.productId]}</td>
                                                <td>
                                                    {stockCount ? (
                                                        stockCount.find(stock => stock.productId === product.productId)?.stock ?? 'N/A'
                                                    ) : (
                                                        'Loading...'
                                                    )}
                                                </td>

                                                <th className="flex items-center justify-center gap-1 mt-3">
                                                    <button onClick={() => handleSelectOrder(product, idx)} className="">
                                                        <GiConfirmed className="text-xl text-green-600 hover:scale-110" />
                                                    </button>
                                                    <button onClick={() => handleOrderDelete(idx)} className="">
                                                        <MdDeleteForever className="text-xl text-red-600 hover:scale-125" />
                                                    </button>
                                                </th>
                                            </tr>)

                                        }

                                    </tbody>

                                </table>
                            </div>

                        </div>

                        <div className="divider"></div>

                        {selectedOrders && <div >
                            <div className="text-center">
                                <h4 className="text-3xl font-semibold mb-5">Selected Order</h4>

                                <div className="overflow-x-auto">
                                    <table className="table">

                                        <thead>
                                            <tr>

                                                <th>No</th>
                                                <th>Photo</th>
                                                <th>Name</th>
                                                <th>ProductId</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total Price</th>


                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                selectedOrders.map((product, idx) => <tr key={idx}>
                                                    <td>
                                                        {idx + 1}

                                                    </td>
                                                    <td>
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle h-12 w-12">
                                                                <img
                                                                    src={product.product.imgUrl}
                                                                    alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {product.product.title}
                                                    </td>
                                                    <td>
                                                        {product.product.productId}
                                                    </td>
                                                    <td>
                                                        ${product.product.price}
                                                    </td>
                                                    <td>
                                                        {product.product.quantity}
                                                    </td>
                                                    <td>
                                                        ${product.totalPrices}
                                                    </td>

                                                </tr>)

                                            }

                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <form onSubmit={handleOrderConfirm}>
                        <div className="text-center mb-5">
                            <h4 className="text-3xl font-semibold">Customer Information</h4>
                        </div>

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 bg-gray-200 p-4">
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="firstname" className="font-medium">Name</label>
                                <input id="firstname" name="name" type="text"
                                    defaultValue={LoaderData.name} placeholder="First name" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="orderId" className="font-medium">OrderId</label>
                                <input id="orderId" name="orderId" type="text"
                                    defaultValue={LoaderData.orderId} placeholder="OrderId" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="email" className="font-medium">Email</label>
                                <input id="email" name="email" type="text"
                                    defaultValue={LoaderData.email} placeholder="Email" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="phone" className="font-medium">Phone</label>
                                <input id="phone" name="phone" type="text"
                                    defaultValue={LoaderData.phone} placeholder="Phone" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="secondPhone" className="font-medium">Second Phone</label>
                                <input id="secondPhone" name="secondPhone" type="text"
                                    defaultValue={LoaderData.secondPhone} placeholder="Second Phone" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="division" className="font-medium">Division</label>
                                <input id="division" name="division" type="text"
                                    defaultValue={LoaderData.division} placeholder="Division" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="district" className="font-medium">District</label>
                                <input id="district" name="district" type="text"
                                    defaultValue={LoaderData.district} placeholder="District" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="thana" className="font-medium">Thana</label>
                                <input id="thana" name="thana" type="text"
                                    defaultValue={LoaderData.thana} placeholder="Thana" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="fullAddress" className="font-medium">Full Address</label>
                                <input id="fullAddress" name="fullAddress" type="text"
                                    defaultValue={LoaderData.address} placeholder="Full Address" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="currentDelivery" className="font-medium">Current Location</label>
                                <input id="currentDelivery" name="currentDelivery" type="text"
                                    defaultValue={LoaderData.currentLocation} placeholder="Current Location" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="orderTimeDate" className="font-medium">Time & Date</label>
                                <input id="orderTimeDate" name="orderTimeDate" type="text"
                                    defaultValue={`${LoaderData.time} ,  ${LoaderData.date}`} placeholder="Date & Time" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="paymentType" className="font-medium">Payment Type</label>
                                <input id="paymentType" name="paymentType" type="text"
                                    defaultValue={LoaderData.paymentType} placeholder="Payment Type" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                            <div className="col-span-2 sm:col-span-3">
                                <label htmlFor="totalPrices" className="font-medium">Total Price</label>
                                <input id="totalPrices" name="totalPrices" type="text"
                                    defaultValue={totalPrice} placeholder="Total Price" className="w-full rounded-md p-[6px]" readOnly />
                            </div>
                        </div>
                        <div className="mb-5">
                            <button type="submit" className="btn btn-secondary w-full">Confirm Order</button>
                        </div>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default ViewOrderDetails;