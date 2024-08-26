import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useProductsData from "../hooks/useProductsData";
import { Rating } from "@smastrom/react-rating";
import { Helmet } from "react-helmet-async";

const CategoryProduct = ({ categoryProducts, categoryName }) => {
    const [, isLoading] = useProductsData()

    return (
        <div>

            {
                categoryProducts.length > 0 &&
                < div className="bg-gray-100 rounded-lg p-4 mt-10" id={categoryName}>
                    {isLoading ? <div className="flex items-center justify-center ">
                        <div className="w-16 h-16 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
                    </div>
                        : <div>
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl md:text-3xl font-semibold">{categoryName}</h3>
                                {
                                    categoryProducts.length > 5 && <Link to="/category"
                                        state={{ category: categoryName, products: categoryProducts, isLoading: isLoading }}
                                        className="text-lg md:text-xl font-medium text-orange-600 hover:scale-105">See more</Link>
                                }
                            </div>
                            <div className="divider mt-0"></div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                                {
                                    categoryProducts.slice(0, 6).map(product => <Link to={`/product/${product._id}`} key={product._id} className="card card-compact bg-base-100 shadow-xl mt-5 ">
                                        <figure>

                                            <img className='w-full h-[150px] hover:scale-110' src={product.imgUrl} alt="" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="text-lg font-medium">{product.title}</h2>
                                            <p className="font-medium">$ <span className="">{product.price}</span></p>

                                            <div className="flex justify-between">
                                                <Rating style={{ maxWidth: 100 }} value={product.rating} readOnly />
                                                <div className="flex gap-4">                                                                                         <FaArrowRight className="text-lg text-orange-600 hover:text-xl"></FaArrowRight>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>)
                                }
                            </div>
                        </div>}
                </div>
            }
        </div >

    );
};

export default CategoryProduct;