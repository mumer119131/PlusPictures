import React from 'react'
import {RxDoubleArrowLeft} from 'react-icons/rx'
import { getPhoto } from '../../utils/ApiCalls'
import SmallGallery from '../SmallGallery/SmallGallery'
import { useNavigate } from 'react-router-dom'
const ImageDetail = ({query, id, image, setImage}) => {

    const [galleryImages, setGalleryImages] = React.useState([])
    const getImage = async () => {
        const newImage = await getPhoto(id)
        setImage(newImage)
    }
    React.useEffect(() => {
        getImage()
    }, [])
  return (
    <div>
        {
            query && <h1 className='text-4xl font-bold mt-[5rem]'>Search Results for "{query}"</h1>
        }
        <h3 className='flex items-center text-primary font-bold gap-1 mt-2'><RxDoubleArrowLeft className='inline font-bold' /> Back</h3>
        {
            image && 
            <div className='flex mt-4 flex-wrap'>
                {
                    image.data.type === 'image' ? 
                    <img src={image.data.main_img} className='h-[40rem]' alt="" /> :
                                <video controls className='sm:w-[100%] lg:w-[60%] h-max'>
                                    <source src={image.data.video} type="video/mp4"></source>
                                </video>
                    
                }
                <div className='p-8 sm:w-[100%] lg:w-[30%]'>
                    <div className='flex items-center gap-2'>
                        
                        <img src={image.data.user_img} alt="user_img" className='rounded-[50%] w-[3rem]' /> 
                        
                        <div>
                            <h2 className='text-sm'><b>{image.data.user}</b></h2>
                            <h2 className='text-xs'>1214 Pictures</h2>
                        </div>
                    </div>
                    <button className='bg-primary text-white mt-4 px-12 py-2 rounded-full'>Free Download</button>
                    <h2 className=' font-semibold text-2xl mt-6 mb-4'>Other free Images</h2>
                    <SmallGallery images={galleryImages} setImages={setGalleryImages} selectedResource={image.data.type == 'image' ? 'Fotos' : 'Videos'}/>
                    <h2 className='underline mt-4 text-sm'>See more free pictures on pexels.com</h2>
                </div>
            </div>
        }
        
    </div>
  )
}

export default ImageDetail