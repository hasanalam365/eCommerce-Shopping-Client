import { Helmet } from "react-helmet-async";
import CategoryProduct from "../../Components/CategoryProduct";
import useProductsData from "../../hooks/useProductsData";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const Categories = () => {

    const [products, isLoading] = useProductsData()

    const categories = products ? [...new Set(products.map(product => product.category))] : [];


    const gadgetDeals = products.filter(product => product.category === 'Gadget Deals')
    const SmartHome = products.filter(product => product.category === 'Smart Home')
    const techEssentials = products.filter(product => product.category === 'Tech Essentials')
    const bestSellers = products.filter(product => product.category === 'Best Sellers')
    const trendingGadgets = products.filter(product => product.category === 'Trending Gadgets')
    const innovativeTech = products.filter(product => product.category === 'Innovative Tech')
    const topRated = products.filter(product => product.category === 'Top Rated')
    const wearableTech = products.filter(product => product.category === 'Wearable Tech')
    const homeAutomation = products.filter(product => product.category === 'Home Automation')
    const portableDevices = products.filter(product => product.category === 'Portable Devices')
    const populars = products.filter(product => product.category === 'Popular')
    const newArrivals = products.filter(product => product.category === 'New Arrival')
    const securityCameras = products.filter(product => product.category === 'Security Camera')


    const [isVisible, setIsVisible] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Show or hide the button based on scroll direction
    const handleScroll = () => {
        const currentScrollY = window.pageYOffset;

        // Show button when scrolling up (towards the top)
        if (currentScrollY < lastScrollY) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }

        // Update the last scroll position
        setLastScrollY(currentScrollY);
    };

    // Scroll the page to the top smoothly
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up event listener
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]); // Dependency array includes lastScrollY to update on scroll




    return (
        <div className="pt-5 flex flex-col-reverse md:flex-row lg:flex-row mb-5">
            <Helmet>
                <title>Category | HMS</title>
            </Helmet>
            <div className="w-full md:w-[77%] lg:w-[77%]">
                {/* Categories Left Side */}
                <CategoryProduct categoryProducts={newArrivals} categoryName="New Arrival"></CategoryProduct>
                <CategoryProduct categoryProducts={populars} categoryName="Popular"></CategoryProduct>
                <CategoryProduct categoryProducts={securityCameras} categoryName="Security Camera"></CategoryProduct>
                <CategoryProduct categoryProducts={gadgetDeals} categoryName="Gadget Deals"></CategoryProduct>
                <CategoryProduct categoryProducts={SmartHome} categoryName="Smart Home"></CategoryProduct>
                <CategoryProduct categoryProducts={techEssentials} categoryName="Tech Essentials"></CategoryProduct>
                <CategoryProduct categoryProducts={bestSellers} categoryName="Best Sellers"></CategoryProduct>
                <CategoryProduct categoryProducts={trendingGadgets} categoryName="Trending Gadgets"></CategoryProduct>
                <CategoryProduct categoryProducts={innovativeTech} categoryName="Innovative Tech"></CategoryProduct>
                <CategoryProduct categoryProducts={topRated} categoryName="Top Rated"></CategoryProduct>
                <CategoryProduct categoryProducts={wearableTech} categoryName="Wearable Tech"></CategoryProduct>
                <CategoryProduct categoryProducts={homeAutomation} categoryName="Home Automation"></CategoryProduct>
                <CategoryProduct categoryProducts={portableDevices} categoryName="Portable Devices"></CategoryProduct>
            </div>
            <div className="mt-10 md:mt-5 lg:mt-5 ml-10 md:w-[23%] p-4 md:fixed md:right-1 md:top-10 lg:fixed lg:right-1 lg:top-10">
                {/* Categpries Right Side */}
                <h5 className="text-center text-2xl font-semibold ">All Category </h5>
                <div className="divider"></div>
                <ul className="pl-4 font-medium">

                    {
                        categories.map((category, idx) => <li key={idx}
                            className="list-disc hover:text-orange-600 hover:cursor-pointer"> <a href={`#${category}`}> {category}</a></li>)
                    }
                </ul>

            </div>
            <div className="fixed bottom-5  right-5 z-50">
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className="bg-orange-600 text-white p-2 rounded-full shadow-lg hover:bg-orange-800 transition duration-300"
                    >
                        <FaArrowUp className="text-xl" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Categories;