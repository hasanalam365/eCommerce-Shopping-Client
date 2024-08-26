import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdatedProfile = () => {

    const axiosPublic = useAxiosPublic()
    const axioSecure = useAxiosSecure()
    const { user } = useAuth()
    const [imgPrev, setImgPrev] = useState('')
    const navigate = useNavigate()

    const { data: userData = [] } = useQuery({
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
        const photo = form.photo.files[0];
        const division = form.division.value;
        const district = form.district.value;
        const thana = form.thana.value;
        const address = form.address.value;

        try {
            if (photo) {
                //image upload 
                const formData = new FormData();
                formData.append('image', photo);
                const res = await axiosPublic.post(image_hosting_api, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                const photoURL = res.data.data.display_url;

                const updatedAddress = { name, phone, email, division, district, thana, address, photoURL }

                const resPut = await axioSecure.put(`/users-updated/${email}`, updatedAddress)

                if (resPut.data.modifiedCount === 1) {
                    toast('Profile Updated')

                    navigate('/dashboard/profile')
                }
            } else {
                const updatedAddress = { name, phone, email, division, district, thana, address }

                const resPut = await axioSecure.put(`/users-updated/${email}`, updatedAddress)

                if (resPut.data.modifiedCount === 1) {
                    toast('Profile Updated')

                    navigate('/dashboard/profile')
                }
            }
        } catch (error) {
            console.log(error.message)
        }


    }

    const handleImg = (e) => {

        const photo = e.target.files[0];
        setImgPrev(photo.name)

    }

    return (
        <div>
            <Helmet>
                <title>Profile Updated | Dashboard | HMS </title>
            </Helmet>
            <section className="  dark:text-gray-900 w-[95%] md:mt-5 lg:mt-0 mx-auto bg-gray-200">
                <form onSubmit={handleAddress} className="container flex flex-col mx-auto space-y-12">
                    <fieldset className=" p-6 rounded-md shadow-sm dark:bg-gray-50">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="fullname" className="font-medium">Full Name</label>
                                <input id="fullName" name="name" type="text" placeholder="Full Name" defaultValue={userData?.displayName} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>
                            <div className="col-span-full  sm:col-span-3">
                                <label htmlFor="fullname" className="font-medium">Email</label>
                                <input id="fullName" name="email" type="text" value={userData.email} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required readOnly />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="phone" className="font-medium">Phone</label>
                                <input id="phone" type="text" name="phone" placeholder="Phone Number" defaultValue={userData?.phone} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Division" className="font-medium">Division</label>
                                <input id="division" type="text"
                                    name="division" placeholder="Division" defaultValue={userData?.division} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="District" className="font-medium">District</label>
                                <input id="district" type="text"
                                    name="district" placeholder="District" defaultValue={userData?.district} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Thana" className="font-medium">Thana</label>
                                <input id="thana" type="text"
                                    name="thana" placeholder="Thana" defaultValue={userData?.thana} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>

                            <div className=' col-span-full sm:col-span-3 text-center'>
                                <label>
                                    <input onChange={handleImg} className='text-sm cursor-pointer w-36 hidden'
                                        type='file'
                                        name='photo'
                                        id='image'
                                        accept='image/*'


                                    />

                                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                        Upload Image
                                    </div>
                                </label>
                            </div>
                            {imgPrev ? <div className="col-span-full sm:col-span-3 flex items-center ">
                                {imgPrev}
                            </div> :
                                <div className="col-span-full sm:col-span-3 flex items-center text-red-600">
                                    No file Select
                                </div>
                            }
                            <div className="col-span-full">
                                <label htmlFor="address" className="font-medium">Address</label>
                                <input id="address" type="text"
                                    name="address" placeholder="Building/House/Street" defaultValue={userData?.address} className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300  p-2" required />
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

export default UpdatedProfile;