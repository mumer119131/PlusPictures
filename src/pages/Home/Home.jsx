import React from 'react'
import Gallery from '../../components/Gallery/Gallery'
import Hero from '../../components/Hero/Hero'
import ResourceSelector from '../../components/ResourceSelector/ResourceSelector'
import Footer from '../../components/Footer/Footer'



const Home = () => {
  const [selectedResource, setSelectedResource] = React.useState('Fotos')
  const [images, setImages] = React.useState([])
  return (
    <div>
        <Hero />
        <h2 className='text-center mt-[10rem] text-[4rem]'>Entdecke die Welt der Bilder</h2>
        <ResourceSelector selectedResource={selectedResource} setSelectedResource={setSelectedResource}/>
        <Gallery selectedResource={selectedResource} images={images} setImages={setImages} />
        <Footer />
    </div>
  )
}

export default Home