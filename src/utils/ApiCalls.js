import axios from 'axios'
import DefaultImage from '../assets/default.jpg'


const getPexelImages = async(query = 'nature', page) => {
    const data = await axios(`https://api.pexels.com/v1/search?query=${query}&page=${page}`, {headers : {Authorization : import.meta.env.VITE_PEXELS_KEY}})
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
const getUnSplashImages = async(query, page) => {
    var url = `https://api.unsplash.com/photos/?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`
    if (query){
        url =  `https://api.unsplash.com/search/photos?query=${query}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&page=${page}`
    }
    const data = await axios(url)
    var new_images = []
    const images = data.data.results ? data.data.results : data.data
    // extract image and user from th data
    for(let image of images){
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

const getPexelVideos = async(query = 'nature', page) => {
    const data = await axios(`https://api.pexels.com/videos/search?query=${query}&page=${page}`, {headers : {Authorization : import.meta.env.VITE_PEXELS_KEY}})
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
const getPixabayVideos = async(query = 'nature', page) => {
    
    const data = await axios.get(`https://pixabay.com/api/videos/?key=${import.meta.env.VITE_PIXBAY_KEY}&q=${query}&page=${page}&per_page=10`)
    
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

const getImagesAndVideos = async(query, page) => {
    const pexelImages = await getPexelImages(query, page)
    const unSplashImages = await getUnSplashImages(query, page)
    const pexelVideos = await getPexelVideos(query, page)
    const pixabayVideos = await getPixabayVideos(query, page)
    const concatImages = [...pexelImages, ...unSplashImages]
    const concatVideos = [...pexelVideos, ...pixabayVideos]
    const concatImagesAndVideos = [...concatImages, ...concatVideos]
    const shuffledImages = concatImagesAndVideos.sort(() => 0.5 - Math.random())
    return shuffledImages
}

const getImages = async(query, page) => {
    const pexelImages = await getPexelImages(query, page)
    const unSplashImages = await getUnSplashImages(query, page)
    const concatImages = [...pexelImages, ...unSplashImages]
    const shuffledImages = concatImages.sort(() => 0.5 - Math.random())
    return shuffledImages
  }
  const getVideos = async(query, page) =>{
    const pexelVideos = await getPexelVideos(query, page)
    const pixabayVideos = await getPixabayVideos(query, page)
    const concatVideos = [...pexelVideos, ...pixabayVideos]
    const shuffledVideos = concatVideos.sort(() => 0.5 - Math.random())
    return shuffledVideos
  }

export {getImages, getVideos, getImagesAndVideos}