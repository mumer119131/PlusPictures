import React from 'react'

const ResourceSelector = ({selectedResource, setSelectedResource}) => {
    const types = ['Fotos', 'Videos', 'Beliebig']
  return (
    <section className='flex flex-wrap mt-4'>

        {
            types.map((type, index) => {
                return <button className={`border-secondaryLight border-2 font-bold  px-8 rounded-full  py-2 transition-all mx-2 ${selectedResource === type ? 'bg-primary text-white' : 'hover:bg-secondaryLight text-secondary hover:text-secondary'}`} key={index} onClick={() => setSelectedResource(type)}>{type}</button>
            })
        }
    </section>
  )
}

export default ResourceSelector