import React, { useEffect } from 'react'
import HeroImage from '../../assets/hero.jpg'
import {BsSearch} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import jsonp from 'jsonp';

const Hero = () => {
    const [popular, setPopular] = React.useState(['People', 'Nature', 'Business & Work', 'Architecture','Food & Drink', 'Animals', 'Art & Culture'])
    const [search, setSearch] = React.useState('')
    const [searchOptions, setSearchOptions] = React.useState([])
    const navigate = useNavigate()
    const [isSuggestionsOpen, setIsSuggestionsOpen] = React.useState(false)
    const handleSearch = (e) =>{
        e.preventDefault()
        if (search == null || search.trim() === '') return
        navigate(`/search/${search}`)
    }
    
    function makeRequest(query) {
        const url = `http://suggestqueries.google.com/complete/search?client=firefox&q=${query}`;
        jsonp(url, null, (err, data) => {
          if (err) {
            console.error(err);
          } else {
            setSearchOptions(data[1].length > 5 ? data[1].slice(0,5) : data[1])
          }
        });
      }
    const getSuggestions = async () => {
        setIsSuggestionsOpen(true)
        makeRequest(search);
    }
    useEffect(()=>{
        console.log(searchOptions)
    }, [searchOptions])
      useEffect(()=>{
        // filter from commonWords and set to setSearchOptions
        if (search){
            getSuggestions()
            // filter such that the search term is at the start of the word
            
        }else{
            setSearchOptions([])
            setIsSuggestionsOpen(false)
        }
      },[search])
    const resetSuggestions = () =>{
        setTimeout(()=>{
            setSearchOptions([])
            setIsSuggestionsOpen(false)
        },1000)
    }
  return (
    <div className='h-[50rem] relative w-full'>
        <img src={HeroImage} alt='hero' className='z-[-1] w-full h-[50rem] absolute object-cover brightness-[80%]' />
        <section className='flex items-center justify-center h-full flex-col relative'>
            <h1 className='absolute top-5 left-5 text-3xl font-bold text-white'>PlusPictures<sup className='font-thin'>&reg;</sup></h1>
            <h2 className='text-[3.5rem] font-bold text-white text-center'>Großartige Bilder</h2>
            <h2 className='text-[3.5rem] font-bold text-white text-center'>lizenzfrei & kostenlos</h2>
            <form onSubmit={handleSearch} className='flex sm:w-[40rem] w-[90%] justify-center mt-[2rem] relative'>
                <input type="text" onBlur={resetSuggestions} className={`w-full p-4 rounded-tl-lg ${(!searchOptions.length > 0 && !isSuggestionsOpen) && 'rounded-bl-lg'} outline-none`} placeholder='Suche nach Fotos oder Videos...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                <div onClick={handleSearch} className={`bg-white flex items-center justify-center px-4 rounded-tr-lg ${(!searchOptions.length > 0 && !isSuggestionsOpen) ? 'rounded-br-lg' : ''}`}>
                    <BsSearch className='text-xl'/>
                </div>
                {
                    searchOptions.length > 0 && isSuggestionsOpen && <div className='sm:w-[40rem] w-[100%] bg-white rounded-bl-lg rounded-br-lg absolute top-[3.5rem] shadow-lg overflow-hidden'>
                        {

                            searchOptions.map((item, index) => {
                                return <Link to={`/search/${item}`} className='w-full mt-2 block capitalize py-4 px-4 hover:bg-primary hover:bg-opacity-50' key={index}>{item}</Link>
                            })
                        }
                    </div>
                }
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