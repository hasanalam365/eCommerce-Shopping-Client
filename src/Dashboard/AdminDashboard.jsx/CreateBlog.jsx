import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOST_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const CreateBlog = () => {

    const editor=useRef(null)
    const [content,setContent]=useState('')
const axiosPublic=useAxiosPublic()
const [imgPrev, setImgPrev] = useState('')

const config = {
    placeholder: "Start typing...",
    readonly: false,
}



    // console.log(content)
    const handleAddBlog = async (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value;
        const thumbnail = form.thumbnail.files;
        const blogContent = content
        const postDate = new Date().toLocaleString()
      
        const allInfo={title,thumbnail,blogContent,postDate}
        console.table(allInfo)

        try {
            const imageFile = { image: thumbnail[0] }
            const resPhoto = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })


            const photoURL = resPhoto.data.data.display_url



            const blog = { title, blogContent, photoURL, postDate }

            const res = await axiosPublic.post('/add-blog', blog)
          
            if (res.data.insertedId) {
                toast.success('blog added successfully')
                setContent('')
                setImgPrev('')
                 form.title.value = ''

            }
        }
        catch (error) {
            console.log(error.message)
        }

    }
   
    const handleImg = (e) => {

        const photo = e.target.files[0];
        setImgPrev(photo.name)

    }

return (
    <div className="mt-10">
        <Helmet>
            <title>Dashboard | Add Blog</title>

        </Helmet>
        <div className="card shrink-0   shadow-2xl bg-base-100  mx-auto">

<div className="text-center">
    <h3 className="text-2xl font-bold mt-2">Write a Blog</h3>
</div>

            <form onSubmit={handleAddBlog} className="card-body">
                <div className="form-control">
                    <span className="mb-2  font-medium">Content Title</span>
                    <label className="input input-bordered flex items-center gap-2 ">
                        <input type="text" className="grow" name="title" placeholder="Title" />
                    </label>
                </div>
           
                 <div className=' text-center  '>
                                <label className="">
                                    <input onChange={handleImg} className='text-sm cursor-pointer w-36 hidden'
                                        type='file'
                                        name='thumbnail'
                                        id='image'
                                        accept='image/*'


                                    />

                                    <div className='bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500'>
                                        Upload Image
                                    </div>
                                </label>
                            </div>
                            {imgPrev ? <div className="col-span-full sm:col-span-3 flex items-center justify-center  mt-5 mb-5">
                          <span className="font-medium"> Selected file: </span>  {imgPrev}
                            </div> :
                                <div className="col-span-full sm:col-span-3 flex items-center justify-center text-red-600 mt-5 mb-5">
                                    No file Select
                                </div>
                            }

                <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onBlur={newContent => setContent(newContent)}
                    onChange={newContent => { }}
                />
                <div className="form-control mt-6">
                    <button className="btn btn-secondary">Create Blog</button>
                </div>

            </form>

        </div>


    </div>
);
};

export default CreateBlog;