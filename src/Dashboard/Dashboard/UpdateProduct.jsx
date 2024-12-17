import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const UpdateProduct = () => {

  const axiosSecure = useAxiosSecure()
  const [clickBtn,setClickBtn]=useState(1)

  const { data:products=[] } = useQuery({
        queryKey: ['all-products-in'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`)
            return res.data
        },
       
    })


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

  



  
  const buttons = [1, 2, 3, 4, 5, 6]
  
  const handleButton = (btn) => {
    setClickBtn(btn)
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
            <h4 className="text-lg font-semibold">Total Products: { products.length}</h4>
                     <div className="join mr-5">
                    <div>

                        <input  className="input input-bordered join-item " placeholder="Search by product Id" />

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
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
                        {
                            products.slice(0,5).map((product, idx) => <tr key={idx}>
                                <td>{idx+1}</td>
       
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={product.
imgUrl
}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
           
          </div>
        </td>
        <td>
        {product.
title
}
         
        </td>
                                <td>{product.
price
}</td>
        <th>
          {product.
stock}
        </th>
        <th>
                                    <Link>
                                        <FaEdit className="text-lg text-green-600 hover:scale-110"/>
                                    </Link>
        </th>
      </tr>)
   }
      
     
     
    </tbody>
   
  </table>
        </div>
        <div className="text-center mt-5 mb-5">
            {
            buttons.map(btn => <button key={btn}
            onClick={()=>handleButton(btn)}
              className={`btn  ml-2 ${btn== clickBtn && 'btn-secondary'}`}>{btn}</button>)
        }
      </div>

        </div>
    );
};

export default UpdateProduct;