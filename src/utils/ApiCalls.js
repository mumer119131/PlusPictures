import axios from 'axios'
import DefaultImage from '../assets/default.jpg'
import randomWords from 'random-words'

const getPhoto = async(id) => {
    if(id.endsWith('us')){
        const image = await axios(`https://api.unsplash.com/photos/${id.slice(0, -2)}?client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`)
       
        const data = {...image.data, data : {
            main_img : image.data.urls.full,
            user : image.data.user.name,
            user_img : image.data.user.profile_image.small,
            type : 'image',
            alt_description : image.data.alt_description,
            user_detail : image.data.user,
            id : image.data.id + 'us'
        }
    }
        return data
    }else if(id.endsWith('pb')){
        const image = await axios(`https://pixabay.com/api/videos?key=${import.meta.env.VITE_PIXBAY_KEY}&id=${id.slice(0, -2)}`)
        // get all the video sizes
        var video_sizes = []

        const videos = image.data.hits[0].videos
        for(let video of Object.keys(videos)){
            video_sizes = [...video_sizes, {quality : video, link : videos[video].url}]
        }
        const data = {...image.data.hits[0], data : {
            main_img : image.data.hits[0].image,
            user : image.data.hits[0].user,
            user_img : image.data.hits[0].userImageURL,
            type : 'video',
            alt_description : image.data.hits[0].description,
            id : image.data.hits[0].id + 'px',
            video : video_sizes
        }}
        return data
    }else if(id.endsWith('px')){
        var image = null
        try{
            image = await axios(`https://api.pexels.com/v1/photos/${id.slice(0, -2)}`, {headers : {Authorization : import.meta.env.VITE_PEXELS_KEY}})
        }catch{
            image = await axios(`https://api.pexels.com/videos/videos/${id.slice(0, -2)}`, {headers : {Authorization : import.meta.env.VITE_PEXELS_KEY}})
        }
        var data = []
        var qualities = []
        if(image.data.video_files){
            // get all the video sizes
            var video_sizes = []
            for(let video of image.data.video_files){
                if (qualities.includes(video.quality)){
                    continue
                }
                qualities = [...qualities, video.quality]
                video_sizes = [...video_sizes, {quality : video.quality, link : video.link}]
            }
            if (video_sizes[0].quality === 'sd'){
                video_sizes = [video_sizes[1], video_sizes[0]]
            }
            data = {...image.data, data : {
                user : image.data.user.name,
                user_img : DefaultImage,
                type : 'video',
                alt_description : image.data.description,
                id : image.data.id + 'px',
                video : video_sizes
            }}
        }else{

            
            data = {...image.data, data : {
                main_img : image.data.src[Object.keys(image.data.src)[0]],
                user : image.data.photographer,
                user_img : DefaultImage,
                type : 'image',
                alt_description : image.data.alt,
                id : image.data.id + 'px',
            }}
        }
        return data
    }
}

const getPexelImages = async(query, page) => {
    if (!query){
        query = randomWords()
    }
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
                alt_description : image.alt,
                id : image.id + 'px'
            }
        }]
    }
    return new_images
}
const getUnSplashImages = async(query = randomWords(), page) => {
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
                    user_detail : image.user,
                    id : image.id + 'us'
        }
    }]
}
return new_images
}

const getPexelVideos = async(query = randomWords(), page) => {
    if(!query){
        query = randomWords()
    }
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
                alt_description : image.description,
                id : image.id + 'px'
            }
      }]
    }
    return new_images
}
const getPixabayVideos = async(query = randomWords(), page) => {
    
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
                alt_description : image.tags,
                id : image.id + 'pb'
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

export {getImages, getVideos, getImagesAndVideos, getPhoto}