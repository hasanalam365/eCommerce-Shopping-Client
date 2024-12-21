// import { toast } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const UpdateProduct = () => {

  const axiosSecure = useAxiosSecure()
  const [currentPage,setCurrentPage]=useState(1)
  const itemPerPage=5


  const { data:products=[] } = useQuery({
        queryKey: ['all-products-in'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products`)
            return res.data
        },
       
    })

  const totalPage=Math.ceil(products.length/itemPerPage)

  const paginationButtons=[]
  for (let i = 1; i <= totalPage; i++){
    paginationButtons.push(i)
  }

  const paginationProducts = products.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage
)


   

  



  
  // const buttons = [1, 2, 3, 4, 5, 6]
  
  const handleButton = (btn) => {
     setCurrentPage(btn)
  }

    return (
     

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
        
        <th>Nasaao</th>
        <th>Image</th>
        <th>Product Title</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Action</th>
      </tr>
    </thead>
   <tbody>
            {paginationProducts.map((product, idx) => (
              <tr key={idx}>
                <td>{(currentPage - 1) * itemPerPage + idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={product.imgUrl} alt="Product Image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <th>{product.stock}</th>
                <th>
                  <Link>
                    <FaEdit className="text-lg text-green-600 hover:scale-110" />
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
   
  </table>
        </div>
        <div className="text-center mt-5 mb-5">
          {
            paginationButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButton(btn)}
                className={`btn ml-2 ${btn === currentPage && 'btn-secondary'}`}
              >
{btn}

              </button>
            ))
         }
      </div>

        </div>
    );
};

export default UpdateProduct;