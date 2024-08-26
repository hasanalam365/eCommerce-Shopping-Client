import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";

const Blogs = () => {

    const axiosPublic=useAxiosPublic()

    const {data:blogContents}=useQuery({
        queryKey: ['blog-content'],
        queryFn: async()=>{
            const res=await axiosPublic.get('/add-blog')
            return res.data
        }
    })

    console.log(blogContents)

    return (
        <div className="mt-20 flex items-center justify-center">
<Helmet>
                <title>Blogs | HMS</title>
            </Helmet>

            <h5>This Features Not be Available</h5>
        </div>
    );
};

export default Blogs;