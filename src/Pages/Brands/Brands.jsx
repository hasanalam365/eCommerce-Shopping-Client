import { Helmet } from "react-helmet-async";


const Brands = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mb-10 mt-5">
            <Helmet>
                <title>Brands | HMS </title>
            </Helmet>
            <div className="card card-compact bg-base-200  shadow-xl p-16 hover:scale-105">
                <figure>
                    <img
                        src="https://i.ibb.co/5110PgS/samsung-removebg-preview.png"
                        alt="Shoes" />
                </figure>

            </div>
            <div className="card card-compact bg-base-100 shadow-xl p-16 hover:scale-105">
                <figure>
                    <img
                        src="https://i.ibb.co/J3Z3TPc/oraimo-removebg-preview.png"
                        alt="Shoes" />
                </figure>

            </div>
            <div className="card card-compact bg-base-100 shadow-xl p-16 hover:scale-105">
                <figure>
                    <img
                        src="https://i.ibb.co/dfvZYm0/lenevo-removebg-preview.png"
                        alt="Shoes" />
                </figure>

            </div>
        </div>
    );
};

export default Brands;