import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const UpdateProduct = () => {

    const axiosSecure = useAxiosSecure()

    const handleStockUpdate = async (e) => {
        e.preventDefault()
        const form = e.target;
        const productId = form.productId.value;
        const stockAmounts = form.stockAmounts.value

        const updateProduct = { stockAmounts }

        const res = await axiosSecure.put(`/stockAdded/${productId}`, updateProduct)

        if (res.data.modifiedCount === 1) {
            toast('Stock Updated')
            form.productId.value = '';
            form.stockAmounts.value = ''
        }

    }

    const handleDeleteProduct = async (e) => {
        e.preventDefault()
        const form = e.target;
        const productId = form.productId.value;
        const res = await axiosSecure.delete(`/delete-product/${productId}`)
        Swal.fire({
            title: "Are you sure?",
            text: "You want delete this product!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                if (res.data.deletedCount === 1) {
                    toast('Deleted Product')
                    form.productId.value = '';
                }
            }
        });



    }

    return (
        <div className="flex items-center justify-center mt-10 ">
            <Helmet>
                <title>Update Product | Admin | HMS </title>
            </Helmet>
            {/* stock updated */}
            <div className="flex flex-col gap-5 ">
                <form onSubmit={handleStockUpdate}>

                    <div className="flex flex-col md:flex-row gap-5 w-[90%] mx-auto">
                        <div className="">
                            <label htmlFor="productId" className="font-medium">Product Id</label>
                            <input id="productId" name="productId" type="number"
                                placeholder="product Id" className="w-full rounded-md p-[6px] bg-gray-100" />
                        </div>
                        <div className="">
                            <label htmlFor="stockAmounts" className="font-medium">Stock Amounts</label>
                            <input id="stockAmounts" name="stockAmmounts" type="number"
                                placeholder="stock Amounts" className="w-full rounded-md p-[6px] bg-gray-100" />
                        </div>

                    </div>
                    <div className=" mt-5 w-[90%] mx-auto">
                        <button type="submit" className="btn btn-secondary">Update Stock</button>
                    </div>
                </form>

                {/* Deleted Product */}
                <form onSubmit={handleDeleteProduct}>

                    <div className="flex flex-col md:flex-row gap-5 w-[90%] mx-auto">
                        <div className="">
                            <label htmlFor="productId" className="font-medium">Product Id</label>
                            <input id="productId" name="productId" type="number"
                                placeholder="product Id" className="w-full rounded-md p-[6px] bg-gray-100" />
                        </div>


                    </div>
                    <div className=" mt-5 w-[90%] mx-auto">
                        <button type="submit" className="btn  btn-secondary">Delete Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;