import { FaUser } from "react-icons/fa6";
import { MdKey } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";


const Login = () => {

    const { signInUser, googleSignIn } = useAuth()
    const [openPassword, setOpenPassword] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPublic = useAxiosPublic()
    const role = 'user'


    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(async (result) => {
                if (result.user) {

                    toast("Login Successfully!")
                    const userInfo = {
                        email: email,
                        role: role
                    }

                    await axiosPublic.post(`/users`, userInfo)

                }

                navigate(location?.state || "/")

            })
            .catch(() => {
                toast.error("Invalid Email/Password!")
            })

    }

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(async (result) => {
                if (result.user) {

                    const userInfo = {
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        displayName: result.user.displayName,
                        role: role
                    }
                    toast("Login Successfully!")
                    await axiosPublic.post(`/users`, userInfo)

                }

                navigate(location?.state || "/")
            })
            .catch(error => {
                console.log(error.message)
            })

    }

    const passwordVisibilityToggle = (e) => {
        e.preventDefault()
        setOpenPassword(!openPassword)
    }

    return (
        <div className=" bg-base-300 min-h-screen p-8 pt-20">
            <Helmet>
                <title>Log in | HMS </title>
            </Helmet>
            <div className="w-[95%] md:w-1/2 lg:w-[40%] mx-auto ">

                <div className="card bg-base-100   ">
                    <h3 className="text-2xl font-semibold text-center mt-2"> Login</h3>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="input input-bordered flex items-center gap-2">
                                <FaUser></FaUser>
                                <input type="email" className="grow"
                                    name="email" placeholder="Email" />

                            </label>

                        </div>
                        <div className="form-control">
                            <label className="input input-bordered flex items-center gap-2">
                                <MdKey ></MdKey >
                                <input type={`${openPassword ? 'text' : 'password'}`} className="grow"
                                    name="password" placeholder="Password" />
                                {
                                    !openPassword ? <button onClick={passwordVisibilityToggle}>
                                        <FaRegEye></FaRegEye>
                                    </button>
                                        :
                                        <button onClick={passwordVisibilityToggle}>
                                            <FaEyeSlash></FaEyeSlash>
                                        </button>
                                }

                            </label>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-secondary">Login</button>
                        </div>
                    </form>
                    <div className="divider">OR</div>
                    <button onClick={handleGoogleLogin} className="border-2 w-3/4 md:w-3/4 lg:w-3/4 mx-auto rounded-lg p-2 mb-3">
                        <div className="flex gap-3 items-center justify-center ">
                            <FcGoogle className="text-2xl"></FcGoogle>
                            <h5 className="text-lg">Continue with Google</h5>
                        </div>
                    </button>
                    <div className=" w-full mx-auto rounded-lg p-2 mb-3">
                        <div className="flex gap-1 items-center justify-center ">

                            <h5 className="">Don't have any account ?</h5>
                            <span> Please</span>
                            <Link to="/register" className="text-blue-600">Register</Link>
                        </div>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Login;