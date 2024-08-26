import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaUsers } from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState('')

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users', search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}`)
            return res.data
        },
        enabled: !!search || search === '',
    })



    const handleChangeRole = (user) => {

        Swal.fire({
            title: "Do you want to change user role?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Make Admin`,
            denyButtonText: `Make User`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const role = 'admin'
                const res = await axiosSecure.patch(`/users/admin/${user._id}`, { role })

                if (res.data.modifiedCount === 1) {
                    toast('Make Admin successfully')
                    refetch()
                }
            } else if (result.isDenied) {
                const role = 'user'

                const res = await axiosSecure.patch(`/users/admin/${user._id}`, { role })

                if (res.data.modifiedCount === 1) {
                    toast('Make user successfully')
                    refetch()
                }
            }
        });
    }


    const handleDelete = (email) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/users/${email}`)

                if (res.data.deletedCount === 1) {
                    toast('User has been deleted')
                    refetch()
                }
            }
        });


    }

    const inputText = (e) => {
        setSearch(e.target.value)
        refetch()
    }


    return (
        <div className="flex flex-col mt-4 px-4 md:p-8">
            <Helmet>
                <title>All Users | Admin | HMS </title>
            </Helmet>
            <div className="flex items-center justify-between mb-2">

                <h4 className="text-lg font-semibold">Total Users: <span>{users.length}</span></h4>
                <div className="join mr-5">
                    <div>

                        <input onChange={inputText} className="input input-bordered join-item " placeholder="Search by email" />

                    </div>

                </div>
            </div>
            {isLoading ? <div className="flex items-center justify-center ">
                <div className="w-16 h-16 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
            </div> : users.length === 0 ? <span className="flex items-center justify-center mt-5">No user found!</span> : <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>

                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) =>
                                <tr key={idx}>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={user.photoURL} alt='user photo' />
                                                </div>
                                            </div>

                                        </div>
                                    </td>

                                    <td>{user.displayName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin' ? <button onClick={() => handleChangeRole(user)}>
                                            Admin
                                        </button> : <button onClick={() => handleChangeRole(user)} className="btn btn-ghost btn-xs text-white bg-green-600 ">
                                            <FaUsers className="text-lg" />
                                        </button>}
                                    </td>
                                    <th>
                                        <button onClick={() => handleDelete(user.email)} className="btn btn-ghost btn-xs text-white bg-red-600 ">Delete</button>
                                    </th>
                                </tr>)
                        }

                    </tbody>

                </table>
            </div>}
        </div>

    );
};

export default AllUsers;