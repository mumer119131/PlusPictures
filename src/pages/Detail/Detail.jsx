import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SearchNav from '../../components/SearchNav/SearchNav'
import ImageDetail from '../../components/ImageDetail/ImageDetail'
import ResourceSelector from '../../components/ResourceSelector/ResourceSelector'

const Detail = () => {
    const { id } = useParams()
    const location = useLocation();
    const [selectedResource, setSelectedResource] = React.useState('Fotos')

    const query = location.state.query;
    return (
        <section>
            <SearchNav />
            <ImageDetail query={query} id={id}/>
            <ResourceSelector selectedResource={selectedResource} setSelectedResource={setSelectedResource}/>
            {
                query && <h1 className='text-4xl font-bold mt-[2rem]'>Other Images for "{query}"</h1>
            }
        </section>
  )
}

export default Detail