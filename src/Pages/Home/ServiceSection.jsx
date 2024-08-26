import { Ri24HoursFill } from "react-icons/ri";
import { GiSwipeCard } from "react-icons/gi";
import { SiGoogleauthenticator } from "react-icons/si";
import { FaShippingFast } from "react-icons/fa";

const ServiceSection = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-[95%] mx-auto gap-8 mt-10 mb-10">
            <div className="flex flex-col items-center justify-center space-y-1 hover:scale-105 hover:text-orange-600">
                <Ri24HoursFill className="text-4xl"></Ri24HoursFill>
                <h5 className="uppercase font-medium">Support 24/7</h5>
                <p>We Support Online 24 Hours</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 hover:scale-105 hover:text-orange-600">
                <GiSwipeCard className="text-4xl"></GiSwipeCard>
                <h5 className="uppercase font-medium">Online Payment</h5>
                <p>Make payments hands free very easily</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 hover:scale-105 hover:text-orange-600">
                <SiGoogleauthenticator className="text-4xl"></SiGoogleauthenticator>
                <h5 className="uppercase font-medium">Authentic Product</h5>
                <p>Guaranteed 100% authentic product</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-1 hover:scale-105 hover:text-orange-600">
                <FaShippingFast className="text-4xl"></FaShippingFast>
                <h5 className="uppercase font-medium">Fast Delivery</h5>
                <p>Fast Delivery is our first rules</p>
            </div>
        </div>
    );
};

export default ServiceSection;