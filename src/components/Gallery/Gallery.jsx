import axios from 'axios'
import React, {useEffect} from 'react'
import './gallery.css'
const Gallery = () => {
  const [images, setImages] = React.useState([])

  const getImages = async() => {
    const data = await axios(`https://api.unsplash.com/photos/?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`)
    setImages(data.data)
  }


  useEffect(()=>{
      getImages()
  })
  
  return (
    <section className='gallery mt-[5rem]'>
      {
        images.map((image, index) => {
          return <div className='pics relative group ' key={index}>
            <img src={image.urls.regular} className='group-hover:brightness-50' alt={image.alt_description} style={{width : '100%'}}/>
            <button className='border-secondaryLight hidden group-hover:block h-[3rem] w-[8rem] absolute border-2 text-secondaryLight font-bold px-8 rounded-full hover:bg-secondaryLight hover:text-secondary py-2 transition-all left-0 right-0 top-0 bottom-0 mx-auto my-auto'>View</button>
            <div className='absolute hidden gap-2 h-max w-max left-0 right-0 top-28 bottom-0 mx-auto my-auto group-hover:flex'>
              <img src={image.user.profile_image.small} className='rounded-[50%]'/>
              <h1 className='text-secondaryLight text-2xl'>@{image.user.name}</h1>
            </div>
          </div>
        })
      }
    </section>
  )
}

export default Gallery