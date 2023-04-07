import React, {useEffect} from 'react'
import './gallery.css'
import {BsFillPlayFill} from 'react-icons/bs'
import { getImages, getImagesAndVideos, getVideos } from '../../utils/ApiCalls'
import { Link, useNavigate } from 'react-router-dom'

const Gallery = ({selectedResource, query, images, setImages, setIsLoading}) => {
  const navigate = useNavigate()
  
  const handleResourceChange = async () => {
    setImages([])
    if (setIsLoading){
      setIsLoading(true)
    }
    if (selectedResource === 'Fotos') {
      setImages(await getImages(query))
    }else if(selectedResource == 'Videos'){
      setImages(await getVideos(query))
    }else if(selectedResource == 'Beliebig'){
      setImages(await getImagesAndVideos(query))
    }

    if (setIsLoading){
      setIsLoading(false)
    }
  }

  const navigateToDetail = (id) => {
    navigate(`/detail/${id}`, { target: '_blank', state : {query} })
    window.location.reload()
  }
  useEffect(()=>{
    handleResourceChange()
  }, [selectedResource, query])
  
  return (
    <section className='gallery mt-[2rem] mb-[4rem]'>
      {
        images.map((image, index) => {
          return <div to={`/detail/${image.data.id}`} target='_blank' className='pics relative group ' key={index}>
            {
              image.data.type === 'video' && <BsFillPlayFill className='absolute text-white text-2xl left-2 top-2'/>
            }
            <img src={image.data.main_img} className='group-hover:brightness-50 ' alt={image.data.alt_description} style={{width : '100%'}}/>
            <button onClick={()=> navigateToDetail(image.data.id) } className='border-secondaryLight hidden group-hover:block h-[3rem] w-[8rem] absolute border text-secondaryLight font-bold px-8 rounded-full hover:bg-secondaryLight hover:text-secondary hover:bg-opacity-50 py-2 transition-all left-0 right-0 top-0 bottom-0 mx-auto my-auto'>{image.data.type === 'image' ? 'View' : 'Watch'}</button>
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