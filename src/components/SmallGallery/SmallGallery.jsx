import React, {useEffect} from 'react'
import {BsFillPlayFill} from 'react-icons/bs'
import { getImages, getImagesAndVideos, getVideos } from '../../utils/ApiCalls'
import { Link, useNavigate } from 'react-router-dom'

const SmallGallery = ({selectedResource, query, images, setImages, setIsLoading}) => {
  const navigate = useNavigate()
  
  const handleResourceChange = async () => {
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
    console.log('called')
    navigate(`/detail/${id}`, { target: '_blank', state : {query} })
    window.location.reload()
  }
  useEffect(()=>{
    handleResourceChange()
  }, [selectedResource, query])
  
  return (
    <section className='gallery'>
      {
        images.slice(0,8).map((image, index) => {
          return <div onClick={()=> navigateToDetail(image.data.id)} className='pics relative group ' key={index}>
            {
              image.data.type === 'video' && <BsFillPlayFill className='absolute text-white text-2xl left-2 top-2'/>
            }
            <img src={image.data.main_img} className='group-hover:brightness-50 ' alt={image.data.alt_description} style={{width : '100%'}}/>
          </div>
        })
      }
    </section>
  )
}

export default SmallGallery