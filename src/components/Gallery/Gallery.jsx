import axios from 'axios'
import React, {useEffect} from 'react'
import './gallery.css'
import {BsFillPlayFill} from 'react-icons/bs'
import DefaultImage from '../../assets/default.jpg'

const Gallery = ({selectedResource}) => {
  const [images, setImages] = React.useState([])
  const query = "nature";
  const params = {
    key: import.meta.env.VITE_PIXBAY_KEY,
    q: query,
    per_page: 20,
};

  const getImages = async() => {
    const pexelImages = await getPexelImages()
    const unSplashImages = await getUnSplashImages()
    const concatImages = [...pexelImages, ...unSplashImages]
    const shuffledImages = concatImages.sort(() => 0.5 - Math.random())
    setImages(shuffledImages)
  }
  const getVideos = async() =>{
    const pexelVideos = await getPexelVideos()
    const pixabayVideos = await getPixabayVideos()
    const concatVideos = [...pexelVideos, ...pixabayVideos]
    const shuffledVideos = concatVideos.sort(() => 0.5 - Math.random())
    setImages(shuffledVideos)
  }

  const getPexelImages = async() => {
    const data = await axios(`https://api.pexels.com/v1/search?query=${query}`, {headers : {Authorization : import.meta.env.VITE_PEXELS_KEY}})
    var new_images = []
    // extract image and user from th data
    for(let image of data.data.photos){
      new_images = [...new_images, {
        image,
        data : {
          main_img : image.src.large,
          user : image.photographer,
          user_img : DefaultImage,
          type : 'image',
          alt_description : image.alt
        }
      }]
    }
    return new_images
  }
  const getUnSplashImages = async() => {
    const data = await axios(`https://api.unsplash.com/photos/?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`)
    var new_images = []
    // extract image and user from th data
    for(let image of data.data){
      new_images = [...new_images, 
      {
        image,
        data : {
          main_img : image.urls.regular,
          user : image.user.name,
          user_img : image.user.profile_image.small,
          type : 'image',
          alt_description : image.alt_description,
          user_detail : image.user
        }
      }]
    }
    return new_images
  }

  const getPexelVideos = async() => {
    const query = 'nature'
    const data = await axios(`https://api.pexels.com/videos/search?query=${query}`, {headers : {Authorization : import.meta.env.VITE_PEXELS_KEY}})
    var new_images = []
    // extract image and user from th data
    for(let image of data.data.videos){
      new_images = [...new_images, {
        image,
        data : {
          main_img : image.image,
          user : image.user.name,
          user_img : DefaultImage,
          type : 'video',
          alt_description : image.description
        }
      }]
    }

    return new_images
  }
  const getPixabayVideos = async() => {
    const data = await axios(`https://pixabay.com/api/videos/`, {params} )
    var new_images = []
    // extract image and user from th data
    for(let image of data.data.hits){
      new_images = [...new_images, {
        image,
        data : {
          main_img : `https://i.vimeocdn.com/video/${image.picture_id}_640x360.jpg`,
          user : image.user,
          user_img : image.userImageURL,
          type : 'video',
          alt_description : image.tags
        }
      }]
    }
    return new_images
  }

  const getImagesAndVideos = async() => {
    const pexelImages = await getPexelImages()
    const unSplashImages = await getUnSplashImages()
    const pexelVideos = await getPexelVideos()
    const pixabayVideos = await getPixabayVideos()
    const concatImages = [...pexelImages, ...unSplashImages]
    const concatVideos = [...pexelVideos, ...pixabayVideos]
    const concatImagesAndVideos = [...concatImages, ...concatVideos]
    const shuffledImages = concatImagesAndVideos.sort(() => 0.5 - Math.random())
    setImages(shuffledImages)
  }
  useEffect(()=>{
    if (selectedResource === 'Fotos') {
      getImages()
    }else if(selectedResource == 'Videos'){
      getVideos()
    }else if(selectedResource == 'Beliebig'){
      getImagesAndVideos()
    }
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