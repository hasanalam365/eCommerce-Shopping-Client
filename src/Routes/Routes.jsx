import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Brands from "../Pages/Brands/Brands";
// import Dashboard from "../Dashboard/Dashboard/Dashboard";
import Profile from "../Dashboard/Profile";
import DeliveryAddress from "../Pages/DashboardPage/DeliveryAddress";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import ProductDetail from "../Components/ProductDetail";
import MyWishlist from "../Components/MyWishlist";
import CheckoutPage from "../Components/CheckoutPage";
// import CheckOutBOxCart from "../Shared/CheckOutBOxCart";
import Mycarts from "../Components/Mycarts";
import UpdatedProfile from "../Components/UpdatedProfile";
import DashboardLayout from "../MainLayout/DashboardLayout";
import AllUsers from "../Dashboard/Dashboard/AllUsers";
import AdminRoute from "./AdminRoute";
import Dashboard from "../Dashboard/Dashboard";
import AllOrders from "../Dashboard/AdminDashboard.jsx/AllOrders";
import ViewOrderDetails from "../Components/ViewOrderDetails";
import OrderStatus from "../Components/OrderStatus";
import ConfirmOrders from "../Dashboard/AdminDashboard.jsx/ConfirmOrders";
import DetailsConfirmOrder from "../Components/DetailsConfirmOrder";
import AddProduct from "../Dashboard/Dashboard/AddProduct";
import UpdateProduct from "../Dashboard/Dashboard/UpdateProduct";
import Categories from "../Pages/Categories/Categories";
import Category from "../Components/Category";
import Blogs from "../Pages/Blogs/Blogs";
import ErrorComponent from "../Components/ErrorComponent";
import CreateBlog from "../Dashboard/AdminDashboard.jsx/CreateBlog";
import ProductUpdate from "../Dashboard/Dashboard/ProductUpdate";
// import PersonaLinfo from "../Dashboard/UserDashboard/Profile";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorComponent></ErrorComponent>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/brands',
                element: <Brands></Brands>
            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/product/:id',
                element: <ProductDetail></ProductDetail>,
                // loader: ({ params }) => fetch(`https://hms-server-five.vercel.app/product/${params.id}`)
                loader: ({ params }) => {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    return fetch(`${apiUrl}/product/${params.id}`);
                }
            },
            {
                path: '/blogs',
                element: <Blogs></Blogs>
            },
            {
                path: '/categories',
                element: <Categories></Categories>
            },
            {
                path: '/category',
                element: <Category></Category>
            }
        ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute>
            {/* <Dashboard></Dashboard> */}
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/dashboard/profile',
                element: <Profile></Profile>
            },
            {
                path: '/dashboard/address',
                element: <DeliveryAddress></DeliveryAddress>
            },
            {
                path: '/dashboard/wishlist',
                element: <MyWishlist></MyWishlist>
            },
            {
                path: '/dashboard/mycarts',
                element: <Mycarts></Mycarts>
            },
            {
                path: '/dashboard/updatedProfile',
                element: <UpdatedProfile></UpdatedProfile>
            },
            {
                path: '/dashboard/checkout',
                element: <CheckoutPage></CheckoutPage>
            },
            {
                path: '/dashboard/orderTrack',
                element: <OrderStatus></OrderStatus>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRoute>
                    <AllUsers></AllUsers>
                </AdminRoute>
            },
            {
                path: '/dashboard/all-orders',
                element: <AdminRoute>
                    <AllOrders></AllOrders>
                </AdminRoute>
            },
            {
                path: '/dashboard/view-order/:id',
                element: <AdminRoute>
                    <ViewOrderDetails></ViewOrderDetails>
                </AdminRoute>,
                // loader: ({ params }) => fetch(`https://hms-server-five.vercel.app/view-order/${params.id}`),
                loader: ({ params }) => {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    return fetch(`${apiUrl}/view-order/${params.id}`);
                }

            },
            {
                path: '/dashboard/confirm-orders',
                element: <AdminRoute>
                    <ConfirmOrders></ConfirmOrders>
                </AdminRoute>
            },
            {
                path: '/dashboard/details-confirm-order/:id',
                element: <AdminRoute>
                    <DetailsConfirmOrder></DetailsConfirmOrder>
                </AdminRoute>,
                // loader: ({ params }) => fetch(`https://hms-server-five.vercel.app/details-confirm-order/${params.id}`)
                loader: ({ params }) => {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    return fetch(`${apiUrl}/details-confirm-order/${params.id}`);
                }
            },
            {
                path: '/dashboard/add-product',
                element: <AdminRoute>
                    <AddProduct></AddProduct>
                </AdminRoute>
            },
            {
                path: '/dashboard/update-product',
                element: <AdminRoute>
                    <UpdateProduct></UpdateProduct>
                </AdminRoute>
            },
            {
                path: '/dashboard/add-blog',
                element: <AdminRoute>
                    <CreateBlog></CreateBlog>
                </AdminRoute>
            },
            {
                path: '/dashboard/product-update/:id',
                element: <AdminRoute>
                    <ProductUpdate></ProductUpdate>
                </AdminRoute>,
                loader: ({ params }) => {
                    const apiUrl = import.meta.env.VITE_API_URL;
                    return fetch(`${apiUrl}/product-update/${params.id}`);
                }
                
            },

        ]
    }

]);

export default router