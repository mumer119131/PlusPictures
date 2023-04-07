import React from 'react'
import HeroImage from '../../assets/hero.jpg'
import {BsSearch} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

const Hero = () => {
    const [popular, setPopular] = React.useState(['People', 'Nature', 'Business & Work', 'Architecture','Food & Drink', 'Animals', 'Art & Culture'])
    const [search, setSearch] = React.useState('')
    const navigate = useNavigate()
    const handleSearch = (e) =>{
        e.preventDefault()
        if (search == null || search.trim() === '') return
        navigate(`/search/${search}`)
    }
  return (
    <div className='h-[50rem] relative w-full'>
        <img src={HeroImage} alt='hero' className='z-[-1] w-full h-[50rem] absolute object-cover brightness-[80%]' />
        <section className='flex items-center justify-center h-full flex-col relative'>
            <h1 className='absolute top-5 left-5 text-3xl font-bold text-white'>PlusPictures<sup>&reg;</sup></h1>
            <h2 className='text-[3.5rem] font-bold text-white text-center'>Großartige Bilder</h2>
            <h2 className='text-[3.5rem] font-bold text-white text-center'>lizenzfrei & kostenlos</h2>
            <form onSubmit={handleSearch} className='flex sm:w-[40rem] w-[90%] justify-center mt-[2rem]'>
                <input type="text" className='w-full p-4 rounded-tl-lg rounded-bl-lg outline-none' placeholder='Suche nach Fotos oder Videos...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                <div onClick={handleSearch} className='bg-white flex items-center justify-center px-4 rounded-tr-lg rounded-br-lg'>
                    <BsSearch className='text-xl'/>
                </div>
            </form>
            <div className='flex mt-2 items-center flex-wrap justify-center'>
                <h2 className='text-white'>Populär: </h2>
                {
                    popular.map((item, index) => {
                        return <Link to={`/search/${item}`} className='text-sm text-white py-1 rounded-full mx-1 underline' key={index}>{item},</Link>
                    })
                }
            </div>
            <h3 className='text-white absolute right-5 bottom-5 text-sm font-thin tracking-wider'><span className='underline'>Aarmin van Dam</span> via <span className='underline'>Pexels</span></h3>
        </section>
    </div>
  )
}

export default Hero