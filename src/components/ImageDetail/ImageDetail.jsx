import React from 'react'
import {RxDoubleArrowLeft} from 'react-icons/rx'
import { getPhoto } from '../../utils/ApiCalls'
import Gallery from '../Gallery/Gallery'
import ResourceSelector from '../ResourceSelector/ResourceSelector'
const ImageDetail = ({query, id}) => {

    const [image, setImage] = React.useState(null)
    const [images, setImages] = React.useState([])
    
    const getImage = async () => {
        const newImage = await getPhoto(id)
        setImage(newImage)
    }
    React.useEffect(() => {
        getImage()
    }, [])
    console.log(image)
  return (
    <div>
        {
            query && <h1 className='text-4xl font-bold mt-[5rem]'>Search Results for "{query}"</h1>
        }
        <h3 className='flex items-center text-primary font-bold gap-1 mt-2'><RxDoubleArrowLeft className='inline font-bold' /> Back</h3>
        {
            image && 
            <div className='flex mt-4'>
                <img src={image.data.main_img} className='h-[40rem]' alt="" />
                <div className='p-8'>
                    <div className='flex items-center gap-4'>
                        <img src={image.data.user_img} alt="user_img" className='rounded-[50%] w-[3rem]' />
                        <div>
                            <h2 className='text-2xl font-semibold'>{image.data.user}</h2>

                        </div>
                    </div>
                    <button className='bg-primary text-white mt-4 px-12 py-2 rounded-full'>Free Download</button>
                    <h2 className=' font-semibold text-2xl mt-6'>Other free Images</h2>
                </div>
            </div>
        }
        
    </div>
  )
}

export default ImageDetail