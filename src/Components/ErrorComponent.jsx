import { useNavigate } from "react-router-dom";

const ErrorComponent = () => {

    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex items-center justify-center flex-col gap-5">
                <h4 className="text-5xl font-semibold">404</h4>
                <h3>Oops! Page not found!!</h3>
                <button onClick={handleGoBack} className="btn btn-secondary">Back to website</button>
            </div>
        </div>
    );
};

export default ErrorComponent;