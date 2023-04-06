import React, { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import SearchNav from '../../components/SearchNav/SearchNav'
import ImageDetail from '../../components/ImageDetail/ImageDetail'
import Gallery from '../../components/Gallery/Gallery'
import Footer from '../../components/Footer/Footer'

const Detail = () => {
    const { id } = useParams()
    const location = useLocation();
    const [popular, setPopular] = React.useState(['People', 'Nature', 'Business & Work', 'Architecture','Food & Drink', 'Animals', 'Art & Culture'])
    const [images, setImages] = React.useState([])
    const [image, setImage] = React.useState(null)
    var query = null
    
    try{
        query = location.state.query;
    }catch{
        query = null
    }
    return (
        <section className='px-4'>
            <SearchNav />
            <ImageDetail query={query} id={id} image={image} setImage={setImage}/>
            {
            image && <h1 className='text-4xl font-bold mt-[2rem]'>{query ? `Other ${image.data.type == 'image' ? 'Images' : 'Videos'} for "${query}"` : 'Other Images'}</h1>
            }
            <div className='flex mt-2 items-center flex-wrap'>
                <h2 className='font-bold'>Populär: </h2>
                {
                    popular.map((item, index) => {
                        return <Link to={`/search/${item}`} className='text-sm py-1 rounded-full mx-1 underline' key={index}>{item},</Link>
                    })
                }
            </div>
            {
                image && <Gallery images={images} setImages={setImages} selectedResource={image.data.type == 'image' ? 'Fotos' : 'Videos'} query={query ? query : null}/>
            }
            <Footer />
        </section>
  )
}

export default Detail