import React from 'react'
import { useParams } from 'react-router-dom';
import SearchNav from '../../components/SearchNav/SearchNav';
import ResourceSelector from '../../components/ResourceSelector/ResourceSelector';
import Gallery from '../../components/Gallery/Gallery';
import Footer from '../../components/Footer/Footer';
import { getImages, getImagesAndVideos, getVideos } from '../../utils/ApiCalls';
import './search.css'


const Search = (props) => {
  const { query } = useParams();
  const [selectedResource, setSelectedResource] = React.useState('Fotos')
  const [images, setImages] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)


  const loadMore = async () => {
    setIsLoading(true)
    try{
      var newImages = []
      if (selectedResource === 'Fotos') {
        newImages = await getImages(query, page + 1)
      }else if(selectedResource == 'Videos'){
        newImages = await getVideos(query, page + 1)
      }else if(selectedResource == 'Beliebig'){
        newImages = await getImagesAndVideos(query, page + 1)
      }
      setImages([...images, ...newImages])
      setPage(page + 1)
    }catch{
      console.log('Error')
      setIsLoading(false)
    }
    setIsLoading(false)
  }
  return (
    <section>
      <SearchNav />
      <h1 className='text-4xl text-center font-bold mt-[5rem]'>Search Results for "{query}"</h1>
      <ResourceSelector selectedResource={selectedResource} setSelectedResource={setSelectedResource} />
      <Gallery selectedResource={selectedResource} query={query} images={images} setImages={setImages} setIsLoading={setIsLoading} />
      {
        images.length > 0 && !isLoading && <button onClick={loadMore} className='mb-[5rem] mx-auto block relative bg-primary text-white px-12 py-2 rounded-lg'>Load more</button>
      }
      {
        isLoading && <div className='flex flex-col items-center'>
          <div class="lds-hourglass"></div>
          <h3 className='text-center text-primary text-2xl font-bold'>Loading...</h3>
        </div>
      }
      <Footer />
    </section>
  )
}

export default Search