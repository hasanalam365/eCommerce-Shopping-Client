import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet-async";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useState } from "react";

const Blogs = () => {
    const [searchInput, setSearchInput] = useState('');
    const [serverSearch, setServerSearch] = useState('');
    const axiosPublic = useAxiosPublic();

    const { data: blogContents = [], isLoading, isError } = useQuery({
        queryKey: ['blog-content', serverSearch], // Include serverSearch in the queryKey
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs', { params: { searchTerm: serverSearch } });
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center">
                <div className="w-16 h-16 mt-20 mb-5 md:mt-32 lg:mt-32 border-4 border-dashed border-orange-500 rounded-full animate-spin dark:border-default-600 text-orange-600"></div>
            </div>
        );
    }

    if (isError) {
        return <div>Error loading blogs.</div>;
    }

    const handleSearch = () => {
        setServerSearch(searchInput); // Trigger search by updating serverSearch state
    };

    return (
        <div className="mt-20">
            <Helmet>
                <title>Blogs | HMS</title>
            </Helmet>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold">Blogs</h3>
                </div>
                <div className="text-center">
                    <div className="join">
                        <input
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="input input-bordered join-item"
                            placeholder="Type title for search"
                        />
                        <button onClick={handleSearch} className="btn join-item rounded-r-full">
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="mt-5">
                {blogContents.map(blog => (
                    <div key={blog._id} className="mb-4">
                        <div className="card card-compact p-4">
                            <figure className="flex flex-col">
                                <img src={blog.photoURL} alt="blog image" />
                                <h3 className="text-2xl font-bold mt-5"># {blog.title}</h3>
                            </figure>
                            <Markdown rehypePlugins={[rehypeRaw]}>{blog.blogContent}</Markdown>
                        </div>
                        <div className="divider"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blogs;
