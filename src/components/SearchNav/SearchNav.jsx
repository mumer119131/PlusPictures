import React, { useEffect } from 'react'
import {BsSearch} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import jsonp from 'jsonp';


const SearchNav = () => {
    const [search, setSearch] = React.useState('')
    const navigate = useNavigate()
    const [searchOptions, setSearchOptions] = React.useState([])
    const [isSuggestionsOpen, setIsSuggestionsOpen] = React.useState(false)
    const handleSearch = (e) =>{
        e.preventDefault()
        if (search == null || search.trim() === '') return
        navigate(`/search/${search}`)
      }

    function makeRequest(query) {
        const url = `https://suggestqueries.google.com/complete/search?client=firefox&q=${query}`;
        jsonp(url, null, (err, data) => {
            if (err) {
            console.error(err);
            } else {
                console.log(data[1])
            setSearchOptions(data[1].length > 5 ? data[1].slice(0,5) : data[1])
            }
    });
    }
    const getSuggestions = async () => {
        setIsSuggestionsOpen(true)
        makeRequest(search);
    }

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
    const onSuggestionClick = (item) =>{
        setSearch(item)
        setIsSuggestionsOpen(false)
        navigate(`/search/${item}`)
    }
  return (
    <nav className='py-4 flex flex-wrap justify-between items-center px-2 gap-4'>
        <Link to='/'>
            <h2 className='text-3xl font-bold text-primary'>PlusPictures<sup>&reg;</sup></h2>
        </Link>
        <form onSubmit={handleSearch} className='flex sm:w-[40rem] w-[100%] justify-center'>
                <input type="text" onBlur={resetSuggestions} className='w-full bg-primaryLight px-4 py-2 rounded-tl-lg rounded-bl-lg outline-none' placeholder='Suche nach Fotos oder Videos...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                <div onClick={handleSearch} className='bg-primaryLight flex items-center justify-center px-4 rounded-tr-lg rounded-br-lg'>
                    <BsSearch className='text-xl cursor-pointer'/>
                </div>
                {
                    searchOptions.length > 0 && isSuggestionsOpen && <div className='z-10 sm:w-[40rem] w-[100%] bg-white rounded-bl-lg rounded-br-lg absolute top-[3.5rem] shadow-lg overflow-hidden'>
                        {

                            searchOptions.map((item, index) => {
                                return <span onClick={()=> onSuggestionClick(item)} className='w-full mt-2 block capitalize py-4 px-4 hover:bg-primary hover:bg-opacity-50' key={index}>{item}</span>
                            })
                        }
                    </div>
                }
        </form>
    </nav>
  )
}

export default SearchNav