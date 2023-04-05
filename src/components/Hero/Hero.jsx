import React from 'react'
import HeroImage from '../../assets/hero.jpg'
import {BsSearch} from 'react-icons/bs'
const Hero = () => {
    const [popular, setPopular] = React.useState(['People', 'Nature', 'Business & Work', 'Architecture','Food & Drink', 'Animals', 'Art & Culture'])
  return (
    <div className='h-[50rem] relative w-full'>
        <img src={HeroImage} alt='hero' className='z-[-1] w-full h-[50rem] absolute object-cover brightness-[80%]' />
        <section className='flex items-center justify-center h-full flex-col relative'>
            <h1 className='absolute top-5 left-5 text-3xl font-bold text-white'>PlusPictures<sup>&reg;</sup></h1>
            <h2 className='text-[3.5rem] font-bold text-white text-center'>Großartige Bilder</h2>
            <h2 className='text-[3.5rem] font-bold text-white text-center'>lizenzfrei & kostenlos</h2>
            <div className='flex sm:w-[40rem] w-[90%] justify-center mt-[2rem]'>
                <input type="text" className='w-full p-4 rounded-tl-lg rounded-bl-lg outline-none' placeholder='Suche nach Fotos oder Videos...'/>
                <div className='bg-white flex items-center justify-center px-4 rounded-tr-lg rounded-br-lg'>
                    <BsSearch className='text-xl'/>
                </div>
            </div>
            <div className='flex mt-2 items-center'>
                <h2 className='text-white'>Populär</h2>
                {
                    popular.map((item, index) => {
                        return <span className='text-sm font-bold text-white py-1 rounded-full mx-1' key={index}>{item}</span>
                    })
                }
            </div>
        </section>
    </div>
  )
}

export default Hero