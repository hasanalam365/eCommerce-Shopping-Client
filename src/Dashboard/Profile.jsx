import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Profile = () => {

    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()

    const { data: userData = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`)
            return res.data
        }
    })



    return (
        <div className="bg-base-200 shadow-xl p-2 md:p-4 mt-16 md:mt-5 lg:mt-5 w-[98%]  mx-auto">
            <Helmet>
                <title>Profile | Dashboard </title>
            </Helmet>
            <div className="flex items-center justify-between">
                <h3 className=" text-xl ">Personal Information</h3>
                <Link to='/dashboard/updatedProfile'>
                    <FaEdit className="text-xl md:text-2xl hover:text-orange-500 hover:scale-110"></FaEdit>
                </Link>
            </div>
            <div className="flex gap-3 md:gap-8 lg:gap-10 w-[98%] mx-auto mt-5">

                <figure>
                    <img className="w-[100px] h-[100px] rounded-full"
                        src={userData.photoURL ? userData.photoURL : user.photoURL}
                        alt="Movie" />
                </figure>
                <div className="w-full flex flex-row gap-3 md:gap-10 lg:gap-16 ">
                    <div className="flex flex-col justify-between font-medium opacity-95 ">
                        <h2 className="">Name </h2>
                        <h2 className="">Email </h2>
                        <h2 className="">Phone </h2>
                        <h2 className="">Gender </h2>
                    </div>
                    <div className="flex flex-col justify-between font-medium opacity-95 ">
                        <h2 className="">: </h2>
                        <h2 className="">: </h2>
                        <h2 className="">: </h2>
                        <h2 className="">: </h2>
                    </div>
                    <div className="flex flex-col justify-between font-medium opacity-95 ">
                        <h2 className="">{userData.displayName}</h2>
                        <h2 className="">{userData.email}</h2>
                        {
                            userData?.phone ? <h2 className="">{userData.phone}</h2>
                                :
                                <h2 className="">Undefined</h2>
                        }
                        {
                            userData?.gender ? <h2 className="">{userData.gender} </h2>
                                :
                                <h2 className="">Undefined </h2>
                        }
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Profile;