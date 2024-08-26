import { Rating } from "@smastrom/react-rating";
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Category = () => {

    const location = useLocation();
    const { category, products, isLoading } = location.state || {};

    if (!category || !products) {
        return <p>No category or products available.</p>;
    }

    return (
        <div className="p-4 mt-10">
            {isLoading ? <div className="flex items-center justify-center ">
                <div className="w-16 h-16 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
            </div> :
                <div>
                    <h3 className="text-2xl md:text-3xl font-semibold mt-5">{category} Products</h3>
                    <div className="divider"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

                        {
                            products && products.map(popular => <Link to={`/product/${popular._id}`} key={popular._id} className="card card-compact bg-base-100 shadow-xl mt-5 ">
                                <figure>

                                    <img className='w-full h-[150px] hover:scale-110' src={popular.imgUrl} alt="" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="text-lg font-medium">{popular.title}</h2>
                                    <p className="font-medium">$ <span className="">{popular.price}</span></p>

                                    <div className="flex justify-between">
                                        <Rating style={{ maxWidth: 100 }} value={popular.rating} readOnly />
                                        <div className="flex gap-4">
                                            {/* <FaRegHeart className="text-lg text-orange-600"></FaRegHeart>
                                        <HiOutlineShoppingCart className="text-lg text-orange-600"></HiOutlineShoppingCart> */}
                                            <FaArrowRight className="text-lg text-orange-600 hover:text-xl"></FaArrowRight>
                                        </div>
                                    </div>
                                </div>
                            </Link>)
                        }

                    </div>
                </div>
            }
        </div>
    );
};

export default Category;