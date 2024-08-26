import { FaTrash } from "react-icons/fa6";
import useCartList from "../hooks/useCartList";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Mycarts = () => {

    const [data, refetch] = useCartList()
    const axiosPublic = useAxiosPublic()
    const totalPrices = data.reduce((total, product) => total + product.productData.price, 0)

    const handleDelete = async (_id) => {
        const res = await axiosPublic.delete(`/addToCart/${_id}`)
        if (res.data.deletedCount === 1) {
            toast.error('This item has been deleted')
            refetch()
        }
    }

    return (
        <div className="md:mt-8 lg:mt-0">
            <Helmet>
                <title>My Cart | HMS </title>
            </Helmet>
            <div className="w-full">
                <div className="bg-orange-600 text-center rounded-xl ">
                    <h3 className="text-lg font-semibold text-white p-2">Shopping Cart</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>

                                <th>No.</th>
                                <th>Photo</th>
                                <th>Product Title</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="mb-1">

                            {
                                data.map((product, idx) =>
                                    <tr key={idx} className="bg-base-200">
                                        <th>{idx + 1}</th>
                                        <td>
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={product.productData.imgUrl}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </td>
                                        <td>{product.productData.title}</td>
                                        <td>$ {product.productData.price}</td>
                                        <td>
                                            <button onClick={() => handleDelete(product._id)}>
                                                <FaTrash className="text-red-600 hover:scale-125"></FaTrash>
                                            </button>

                                        </td>
                                    </tr>

                                )


                            }


                        </tbody>
                    </table>
                </div>
                <div className="text-center font-semibold boder border-2 mt-1 mb-1 border-dashed p-2">
                    <h4>Total: $ {totalPrices} </h4>
                </div>
                <Link to="/checkout">
                    <button className="text-white bg-orange-600 p-4 w-full font-semibold rounded-lg">Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default Mycarts;