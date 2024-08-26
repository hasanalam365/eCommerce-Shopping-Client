import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {

    const { signUpUser, signOutUser } = useAuth()
    const navigate = useNavigate()
    const [correctPass, setCorrectPass] = useState('')
    const [imgPrev, setImgPrev] = useState('')
    const [errorText, setErrorText] = useState('')
    const axiosPublic = useAxiosPublic()

    const handleAddress = async (e) => {
        e.preventDefault()
        const form = e.target;
        const displayName = form.name.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const photo = form.photo.files[0];
        const division = form.division.value;
        const district = form.district.value;
        const thana = form.thana.value;
        const address = form.address.value;
        const confirmPassword = form.confirmPassword.value

        if (correctPass !== confirmPassword) {
            return setErrorText('Password Not Match')
        }

        // //image upload 
        const formData = new FormData();
        formData.append('image', photo);
        const res = await axiosPublic.post(image_hosting_api, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        const photoURL = res.data.data.display_url;
        const userInfo = {
            displayName, phone, email, division, district, thana, address, photoURL
        }


        const resUser = await axiosPublic.post(`/newUser`, userInfo)

        if (resUser.data.insertedId) {
            signUpUser(email, confirmPassword)
                .then((result) => {

                    if (result.user) {
                        toast("Register Successfully!")

                    }

                    signOutUser()
                    navigate("/login")
                })
                .catch(() => {
                    toast.error("User already exists")
                })
        }

    }

    const handleImg = (e) => {
        const photo = e.target.files[0];
        setImgPrev(photo.name)

    }

    const handlePassword = e => {
        setCorrectPass(e.target.value)
    }


    return (
        <div className="pt-16 mb-8">
            <Helmet>
                <title>Register | HMS </title>
            </Helmet>
            <section className="  dark:text-gray-900  md:w-3/4 lg:1/2 mx-auto bg-gray-200">
                <form onSubmit={handleAddress} className="container flex flex-col mx-auto space-y-12">
                    <fieldset className=" p-6 rounded-md shadow-sm dark:bg-gray-50">

                        <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="fullname" className="font-medium">Full Name</label>
                                <input id="fullName" name="name" type="text" placeholder="Full Name" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>
                            <div className="col-span-full  sm:col-span-3">
                                <label htmlFor="fullname" className="font-medium">Email</label>
                                <input id="fullName" name="email" type="text" placeholder="Email" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="phone" className="font-medium">Phone</label>
                                <input id="phone" type="text" name="phone" placeholder="Phone Number" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>

                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Division" className="font-medium">Division</label>
                                <input id="division" type="text"
                                    name="division" placeholder="Division" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="District" className="font-medium">District</label>
                                <input id="district" type="text"
                                    name="district" placeholder="District" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Thana" className="font-medium">Thana</label>
                                <input id="thana" type="text"
                                    name="thana" placeholder="Thana" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>

                            <div className=' col-span-full sm:col-span-3 text-center'>
                                <label>
                                    <input onChange={handleImg} className='text-sm cursor-pointer w-36 hidden'
                                        type='file'
                                        name='photo'
                                        id='image'
                                        accept='image/*'

                                        required
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
                                    name="address" placeholder="Building/House/Street" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300  p-2" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Thana" className="font-medium">Password</label>
                                <input id="Password" type="text"
                                    onChange={handlePassword}
                                    name="password" placeholder="Password" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label htmlFor="Confirm Password" className="font-medium">Confirm Password</label>
                                <input id="Confirm Password" type="text"
                                    name="confirmPassword" placeholder="Confirm Password" className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-default-600 dark:border-gray-300 p-2" required />
                                {
                                    errorText && <p className="text-red-600">{errorText}</p>
                                }
                            </div>
                        </div>

                        <div className="mt-2">
                            <button className="btn btn-secondary w-full">Register</button>
                        </div>
                    </fieldset>

                </form>
                <div className=" w-full mx-auto rounded-lg p-2 mb-3">
                    <div className="flex gap-1 items-center justify-center ">

                        <h5 className="">Already have an account ?</h5>
                        <span> Please</span>
                        <Link to="/login" className="text-blue-600">Log In</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;