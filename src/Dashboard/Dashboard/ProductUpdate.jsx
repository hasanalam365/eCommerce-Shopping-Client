import React, { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { useLoaderData } from 'react-router-dom';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;



const ProductUpdate = () => {

     const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [selectedCategory, setSelectedCategory] = useState('')

    const productData = useLoaderData()
     const [imgPrev, setImgPrev] = useState('')

      const handleImg = (e) => {

        const photo = e.target.files[0];
        setImgPrev(photo.name)

    }


   
    
     const handleUpdateProduct = async (e) => {
           e.preventDefault()
           const form = e.target;
           const title = form.title.value;
          
           const rating = form.rating.value;
       
           const stock = form.stock.value;
           const price = form.price.value;
           const description = form.description.value;
           const photo = form.photo.files[0];
   
           try {
               const formData = new FormData();
               formData.append('image', photo);
               const res = await axiosPublic.post(image_hosting_api, formData, {
                   headers: { 'Content-Type': 'multipart/form-data' }
               });
               const imgUrl = res.data.data.display_url;
               const updatedProductData = { title, rating, stock, price, description, imgUrl }
   
               const updatedProduct = await axiosSecure.put(`/update-product/${productData._id}`, updatedProductData)
               if (updatedProduct.data.modifiedCount === 1) {
                   toast('product updated successfully')
                 
                  
               }
   
           } catch (error) {
               console.log(error.message)
           }
   
   
   
    }
   
      const handleChangeCategory = (e) => {
        setSelectedCategory(e.target.value)
    }
    return (
        <div>
                   <Helmet>
                       <title>Updated Product | Admin  </title>
                   </Helmet>
                   <form onSubmit={handleUpdateProduct}>
                       <div className="text-center mb-5">
                           <h4 className="text-3xl font-semibold">Updated Your Product Here</h4>
                       </div>
       
                       <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 bg-gray-200 p-4">
       
                           <div className="col-span-3 sm:col-span-3">
                               <label htmlFor="title" className="font-medium">Title</label>
                        <input id="title" name="title" type="text"
                            defaultValue={productData?.title}
                                   placeholder="title" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                           </div>
                           <div className="col-span-3 sm:col-span-3 flex flex-col">
                               <label htmlFor="category" className="font-medium">Category</label>
                        <select
                             value={selectedCategory || productData?.category}
                            className="select focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full "
                            
                            onChange={handleChangeCategory}
                                  
                               >
                                   <option disabled value="">Pick your category</option>
                                   <option value="Popular">Popular</option>
                                   <option value="New Arrival">New Arrival</option>
                                   <option value="Best Sellers">Best Sellers</option>
                                   <option value="Trending Gadgets">Trending Gadgets</option>
                                   <option value="Smart Home">Smart Home</option>
                                   <option value="Tech Essentials">Tech Essentials</option>
                                   <option value="Innovative Tech">Innovative Tech</option>
                                   <option value="Gadget Deals">Gadget Deals</option>
                                   <option value="Top Rated">Top Rated</option>
                                   <option value="Wearable Tech">Wearable Tech</option>
                                   <option value="Home Automation">Home Automation</option>
                                   <option value="Portable Devices">Portable Devices</option>
                               </select>
       
                           </div>
                           <div className="col-span-3 sm:col-span-3">
                               <label htmlFor="rating" className="font-medium">Rating</label>
                        <input id="rating" name="rating" type="number"
                             defaultValue={productData?.rating}
                                   placeholder="rating" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                           </div>
                          <br />
       
       
                           <div className="col-span-3 sm:col-span-3">
                               <label htmlFor="stock" className="font-medium">Stock</label>
                        <input id="stock" name="stock" type="number"
                             defaultValue={productData?.stock}
                                   placeholder="stock" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                           </div>
                           <div className="col-span-3 sm:col-span-3">
                               <label htmlFor="price" className="font-medium">Price</label>
                        <input id="price" name="price" type="number"
                             defaultValue={productData?.price}
                                   placeholder="price" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent " />
                           </div>
       
                     <div className=' col-span-3 sm:col-span-3 text-center'>
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
                    {imgPrev ? <div className="col-span-3 sm:col-span-3 flex items-center ">
                        {imgPrev}
                    </div> :
                        <div className='col-span-3 sm:col-span-3 flex  items-center gap-10'>
                               <div className=" text-red-600   w-1/2">
                                   No Photo Select
                        </div>
                        <div>
                        <img src={productData?.imgUrl}
                        className='w-8 h-8'
                            alt="" />
                    </div>
                            </div>
                    }
                    
 

                           <div className="col-span-6 sm:col-span-6">
                               <label htmlFor="description" className="font-medium">Description</label>
       
                               <textarea
                                   name="description"
                                   defaultValue={productData?.description}
                                   className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                   rows="4"
                                   placeholder="Enter your description here..."
                               ></textarea>
                           </div>
                       </div>
                     
                       <div className="mb-5">
                           <button type="submit" className="btn btn-secondary w-full">Updated Product</button>
                       </div>
                   </form>
       
               </div>
    );
};

export default ProductUpdate;