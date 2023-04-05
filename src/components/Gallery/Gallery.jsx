import React, {useEffect} from 'react'
import './gallery.css'
import {BsFillPlayFill} from 'react-icons/bs'
import { getImages, getImagesAndVideos, getVideos } from '../../utils/ApiCalls'

const Gallery = ({selectedResource}) => {
  const [images, setImages] = React.useState([])
  
  const handleResourceChange = async () => {
    if (selectedResource === 'Fotos') {
      setImages(await getImages())
    }else if(selectedResource == 'Videos'){
      setImages(await getVideos())
    }else if(selectedResource == 'Beliebig'){
      setImages(await getImagesAndVideos())
    }
  }
  useEffect(()=>{
    handleResourceChange()
  }, [selectedResource])
  
  return (
    <section className='gallery mt-[2rem]'>
      {
        images.map((image, index) => {
          return <div className='pics relative group ' key={index}>
            {
              image.data.type === 'video' && <BsFillPlayFill className='absolute text-white text-2xl left-2 top-2'/>
            }
            <img src={image.data.main_img} className='group-hover:brightness-50' alt={image.data.alt_description} style={{width : '100%'}}/>
            <button className='border-secondaryLight hidden group-hover:block h-[3rem] w-[8rem] absolute border-2 text-secondaryLight font-bold px-8 rounded-full hover:bg-secondaryLight hover:text-secondary py-2 transition-all left-0 right-0 top-0 bottom-0 mx-auto my-auto'>{image.data.type === 'image' ? 'View' : 'Watch'}</button>
            <div className='absolute hidden gap-2 h-max items-center w-max bottom-4 left-4 mx-auto my-auto group-hover:flex'>
              <img src={image.data.user_img} className='rounded-[50%] w-[2rem]'/>
              <h1 className='text-secondaryLight text-lg'>@{image.data.user}</h1>
            </div>
          </div>
        })
      }
    </section>
  )
}

export default Gallery