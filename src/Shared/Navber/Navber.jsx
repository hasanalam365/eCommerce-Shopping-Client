import { Link, NavLink } from "react-router-dom";
// import { FaRegHeart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useState } from "react";
import useCartList from "../../hooks/useCartList";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { IoSearch } from "react-icons/io5";


const Navber = ({ setOpenCart, openCart, setSearch }) => {

    const [isOpenProfile, setIsOpenProfile] = useState(false)
    const [data] = useCartList()
    const axiosPublic = useAxiosPublic()
    const { signOutUser, user } = useAuth()
    const [navOpen, setNavOpen] = useState(false)


    const { data: userData = [] } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user.email}`)
            return res.data
        }
    })

    const navLinks = <>
        <NavLink to="/" onClick={() => setNavOpen(false)} className='hover:text-orange-600'>
            <li>Home</li>
        </NavLink>
        <NavLink onClick={() => setNavOpen(false)} to='/brands' className='hover:text-orange-600'>
            <li>Brands</li>
        </NavLink>
        <NavLink to='/categories' onClick={() => setNavOpen(false)} className='hover:text-orange-600'>
            <li>Categories</li>
        </NavLink>
        <NavLink to="/blogs" onClick={() => setNavOpen(false)} className='hover:text-orange-600'>
            <li>Blogs</li>
        </NavLink>

        <NavLink onClick={() => setNavOpen(false)} className='hover:text-orange-600'>
            <li>Service Center</li>
        </NavLink>


        <a
            href="https://wa.me/+8801645782626"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setNavOpen(false)}
            className="hover:text-orange-600 block md:hidden lg:hidden"
        >
            Support
        </a>

        <NavLink onClick={() => setNavOpen(false)} className='hover:text-orange-600'>
            <li>About</li>
        </NavLink>

    </>

    const hangleLogOut = () => {
        signOutUser()
    }



    return (
        <div className="navbar bg-base-100 container mx-auto h-[66px] z-40 md:z-10 lg:z-10 fixed top-0">
            <div className="navbar-start ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <button onClick={() => setNavOpen(!navOpen)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </button>
                    </div>
                    {navOpen && <ul
                        tabIndex={0}
                        className="menu  dropdown-content bg-base-100  z-10 mt-2 w-80 p-2 shadow text-lg space-y-2  font-medium ">
                        {navLinks}

                        <div className="divider"></div>
                        <NavLink to='/dashboard'>
                            <li>Dashboard</li>
                        </NavLink>

                        {user?.email ? <NavLink className="hover:text-orange-600">
                            <button onClick={hangleLogOut}>Logout</button>
                        </NavLink>
                            :
                            <NavLink className="hover:text-orange-600" onClick={() => setNavOpen(false)}>
                                <Link to="/login" >Login</Link>
                            </NavLink>}


                    </ul>}
                </div>
                <Link to='/' className="hover:scale-105">
                    <img src="https://i.ibb.co/1LSTmBy/logo.png" className="w-[60px] h-[50px]" alt="" />

                </Link>

            </div>
            <div className="hidden md:block lg:hidden">
                <label className="input input-bordered flex items-center gap-2 ">

                    <input onChange={(e) => setSearch(e.target.value)} type="text" className="w-[115px] md:w-[250px]" placeholder="Search Products" />
                    <IoSearch />
                </label>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5 text-lg font-medium">
                    {navLinks}
                </ul>
                <label className="input input-bordered flex items-center gap-2 ml-5">

                    <input onChange={(e) => setSearch(e.target.value)} type="text" className="grow" placeholder="Search Products" />
                    <IoSearch />
                </label>
            </div>

            <div className="navbar-end">

                <div className="">
                    <div className="flex items-center justify-center gap-4 ml-5 mr-5">
                        <div className="block md:hidden lg:hidden">
                            <label className="input input-bordered flex items-center gap-2 ">

                                <input onChange={(e) => setSearch(e.target.value)} type="text" className="w-[115px] md:w-[250px]" placeholder="Search Products" />
                                <IoSearch />
                            </label>
                        </div>

                        <button onClick={() => setIsOpenProfile(!isOpenProfile)} className="hidden md:block lg:block">
                            {
                                user?.email ? <img className="w-[40px] h-[40px] rounded-full" src={userData.photoURL ? userData.photoURL : user.photoURL} alt="user profile photo" />
                                    :
                                    <CgProfile className="text-xl"></CgProfile>
                            }

                        </button>
                        <button onClick={() => setOpenCart(!openCart)} className="relative flex">

                            <HiOutlineShoppingCart className="text-2xl"></HiOutlineShoppingCart>
                            <div className="absolute -right-3 bottom-5 bg-secondary rounded-full text-white">


                                {
                                    !data.length > 0 ? <p className="p-1">0</p>
                                        :
                                        <p className="p-1">{data.length}</p>
                                }

                            </div>
                        </button>

                    </div>

                    {
                        isOpenProfile && <div className="absolute z-10 p-4 bg-green-100 top-16 right-16 rounded-lg">
                            <ul className="font-medium space-y-1">
                                <li className="hover:text-orange-600">
                                    <Link to="/dashboard">My Profile</Link>
                                </li>
                                {user?.email ? <li className="hover:text-orange-600">
                                    <button onClick={hangleLogOut}>Logout</button>
                                </li>
                                    :
                                    <li className="hover:text-orange-600">
                                        <Link to="/login" >Login</Link>
                                    </li>}
                            </ul>
                        </div>
                    }
                </div>

            </div>
            {/* <div>
                {
                    allProducts.map(product => <span key={product._id}>product.title</span>)
                }
            </div> */}
        </div>
    );
};

export default Navber;