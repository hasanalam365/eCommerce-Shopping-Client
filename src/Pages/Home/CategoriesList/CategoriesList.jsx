import useProductsData from "../../../hooks/useProductsData";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";


const CategoriesList = () => {

    const [products, isLoading] = useProductsData()

    const categories = products ? [...new Set(products.map(product => product.category))] : [];

    const categoryProducts = {
        'Gadget Deals': products.filter(product => product.category === 'Gadget Deals'),
        'Smart Home': products.filter(product => product.category === 'Smart Home'),
        'Tech Essentials': products.filter(product => product.category === 'Tech Essentials'),
        'Best Sellers': products.filter(product => product.category === 'Best Sellers'),
        'Trending Gadgets': products.filter(product => product.category === 'Trending Gadgets'),
        'Innovative Tech': products.filter(product => product.category === 'Innovative Tech'),
        'Top Rated': products.filter(product => product.category === 'Top Rated'),
        'Wearable Tech': products.filter(product => product.category === 'Wearable Tech'),
        'Home Automation': products.filter(product => product.category === 'Home Automation'),
        'Portable Devices': products.filter(product => product.category === 'Portable Devices'),
        'Popular': products.filter(product => product.category === 'Popular'),
        'Security Camera': products.filter(product => product.category === 'Security Camera'),
        'New Arrival': products.filter(product => product.category === 'New Arrival'),
    };

    return (
        <div>
            <h3 className="text-2xl mt-8 border-l-4 pl-2 border-orange-600 ml-2">Categories</h3>
            <div className="divider"></div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, Navigation]}
                className="mySwiper mt-4 !px-4 md:!w-[60%] md:!px-8 lg:!w-1/2 lg:!px-8"
            >
                {
                    categories.map(category => <SwiperSlide key={category} className="border-2 border-gray-600 text-center !h-[100px] !flex !items-center !justify-center font-medium">
                        <Link to="/category"
                            state={{ category: category, products: categoryProducts[category], isLoading: isLoading }}
                            className="text-lg md:text-xl font-medium  hover:scale-105">{category}</Link>
                    </SwiperSlide>)
                }


            </Swiper>
        </div>
    );
};

export default CategoriesList;