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
        // <div className="flex items-center justify-center mt-10 ">
        //     <Helmet>
        //         <title>Update Product | Admin | HMS </title>
        //     </Helmet>
        //     {/* stock updated */}
        //     <div className="flex flex-col gap-5 ">
        //         <form onSubmit={handleStockUpdate}>

        //             <div className="flex flex-col md:flex-row gap-5 w-[90%] mx-auto">
        //                 <div className="">
        //                     <label htmlFor="productId" className="font-medium">Product Id</label>
        //                     <input id="productId" name="productId" type="number"
        //                         placeholder="product Id" className="w-full rounded-md p-[6px] bg-gray-100" />
        //                 </div>
        //                 <div className="">
        //                     <label htmlFor="stockAmounts" className="font-medium">Stock Amounts</label>
        //                     <input id="stockAmounts" name="stockAmmounts" type="number"
        //                         placeholder="stock Amounts" className="w-full rounded-md p-[6px] bg-gray-100" />
        //                 </div>

        //             </div>
        //             <div className=" mt-5 w-[90%] mx-auto">
        //                 <button type="submit" className="btn btn-secondary">Update Stock</button>
        //             </div>
        //         </form>

        //         {/* Deleted Product */}
        //         <form onSubmit={handleDeleteProduct}>

        //             <div className="flex flex-col md:flex-row gap-5 w-[90%] mx-auto">
        //                 <div className="">
        //                     <label htmlFor="productId" className="font-medium">Product Id</label>
        //                     <input id="productId" name="productId" type="number"
        //                         placeholder="product Id" className="w-full rounded-md p-[6px] bg-gray-100" />
        //                 </div>


        //             </div>
        //             <div className=" mt-5 w-[90%] mx-auto">
        //                 <button type="submit" className="btn  btn-secondary">Delete Product</button>
        //             </div>
        //         </form>
        //     </div>
        // </div>

        <div>

            <div>
                <h4 className="text text-center mt-8 text-lg font-bold border-dashed border-2   mb-2 p-2 bg-orange-600 text-white">Inventory System</h4>
                <div className="flex items-center justify-between">
                    <h4>Total Products:</h4>
                     <div className="join mr-5">
                    <div>

                        <input  className="input input-bordered join-item " placeholder="Search by email" />

                    </div>

                </div>
                </div>
            </div>
                <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>No</th>
        <th>Image</th>
        <th>Product Title</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      <tr>
       
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">Hart Hagerty</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
        <td>
          Zemlak, Daniel and Leannon
          <br />
          <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
        </td>
        <td>Purple</td>
        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
     
     
    </tbody>
   
  </table>
</div>
        </div>
    );
};

export default UpdateProduct;