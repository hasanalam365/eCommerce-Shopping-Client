import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ConfirmOrders = () => {

    const [search, setSearch] = useState('')
    const axiosSecure = useAxiosSecure()

    const { data: confirmOrders = [], refetch, isLoading } = useQuery({
        queryKey: ['confirm-orders', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/confirmOrder?search=${search}`)
            return res.data
        }
    })

    const inputText = (e) => {
        setSearch(e.target.value)
        refetch()
    }

    const handleDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to Delete this order!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#008000",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/confirmOrder/${id}`)

                if (res.data.deletedCount === 1) {
                    toast('this order has been deleted')
                    refetch()
                }
            }
        });


    }

    return (
        <div className="flex flex-col mt-4 px-4 md:p-8">
            <Helmet>
                <title>Confirm Orders | Admin | HMS </title>
            </Helmet>
            <div className="flex items-center justify-between mb-2">

                <h4 className="text-lg font-semibold">Confirm Orders: <span>{confirmOrders.length}</span></h4>
                <div className="join mr-5">
                    <div>

                        <input onChange={inputText} className="input input-bordered join-item " placeholder="Search by order id" />

                    </div>

                </div>
            </div>
            {isLoading ? <div className="flex items-center justify-center ">
                <div className="w-16 h-16 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
            </div> : confirmOrders.length === 0 ? <span className="flex items-center justify-center mt-5">No data found!</span> : <div className="overflow-x-auto">
                <table className="table table-zebra">

                    <thead>
                        <tr className="bg-orange-600 text-white">
                            <th>No</th>
                            <th>Customer Name</th>
                            <th>Order Id</th>
                            <th>Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            confirmOrders.map((order, idx) => <tr key={order._id}>
                                <th>{idx + 1}</th>

                                <td>{order.customerInfo.name}</td>
                                <td>{order.customerInfo.orderId}</td>

                                <td className="text-blue-600 hover:scale-105 hover:text-green-600">
                                    <Link to={`/dashboard/details-confirm-order/${order._id}`}>View</Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(order._id)}>
                                        <FaTrashAlt className="text-red-400 hover:scale-125 hover:text-red-600" />
                                    </button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>}
        </div >
    );
};

export default ConfirmOrders;