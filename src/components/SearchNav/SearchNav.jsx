import React from 'react'
import {BsSearch} from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

const SearchNav = () => {
    const [search, setSearch] = React.useState('')
    const navigate = useNavigate()
    const handleSearch = (e) =>{
        e.preventDefault()
        if (search == null || search.trim() === '') return
        navigate(`/search/${search}`)
      }
  return (
    <nav className='py-4 flex flex-wrap justify-between items-center px-2 gap-4'>
        <Link to='/'>
            <h2 className='text-3xl font-bold text-primary'>PlusPictures<sup>&reg;</sup></h2>
        </Link>
        <form onSubmit={handleSearch} className='flex sm:w-[40rem] w-[100%] justify-center'>
                <input type="text" className='w-full bg-primaryLight px-4 py-2 rounded-tl-lg rounded-bl-lg outline-none' placeholder='Suche nach Fotos oder Videos...' value={search} onChange={(e) => setSearch(e.target.value)}/>
                <div onClick={handleSearch} className='bg-primaryLight flex items-center justify-center px-4 rounded-tr-lg rounded-br-lg'>
                    <BsSearch className='text-xl cursor-pointer'/>
                </div>
        </form>
    </nav>
  )
}

export default SearchNav