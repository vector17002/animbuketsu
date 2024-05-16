'use client';
import Card from '@utils/Card';
import React , {useState , useEffect} from 'react'
import Footer from './Footer';
import {MdChevronLeft , MdChevronRight} from 'react-icons/md'
import RandomGenerator from './RandomGenerator';
import toast from 'react-hot-toast';
const Feed = () => {
  const baseUrl ='https://api.jikan.moe/v4';
  const [popular , setPopular] = useState(null);
  const [popularLoading , setPopularLoading] = useState(false);
  const [news , setNews] = useState(null);
  const [searchText , setSearchText] = useState('');
  const [searchResult , setSearchResult] = useState(null);
  useEffect(()=>{
    const getPopular = async ()=>{
      try {
        setPopularLoading(true);
         const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
         const obj = await response.json();
        console.log(obj.paginations)
         setPopular(obj.data);
      } catch (error) {
         console.log(error);
         toast.error('Oops we are out of api requests');
      }   
      finally{
        setPopularLoading(false);
      }
    }
    const getTop = async () => {
        try {
          const res = await fetch(`https://api.jikan.moe/v4/top/anime`)
          const obj = await res.json();
          setNews(obj.data);
        } catch (error) {
          toast.error('Oops we are out of api requests');
          console.log(error);
        }
    }
    getPopular(); 
    if(process.env.NEXT_DEVELOPMENT){
    setTimeout(() => {
      //solving for too many requests to the api server
      getTop();
    } , 1500) 
  }
  else
  getTop();
    
  },[])
  const handleSearch = (e) =>{
     setSearchText(e.target.value)
  }
  const findSearch = async ()=>{
    try{
      const response = await fetch(`${baseUrl}/anime?q=${searchText}&sfw`);
      const obj = await response.json();
      setSearchResult(obj.data);
      setSearchText('');
      console.log(searchResult)
    }
    catch(error){
      toast.error('Couldn\'t find search term');
      console.log(error);
    }
  }
  return (
    <div className='w-[100vw] flex flex-col mt-16 justify-center items-center'>
    <form className='relative w-full sm:w-1/2 flex-center' onSubmit={(e) =>{
      e.preventDefault();
      findSearch();
    }}>
        <input
          type='text'
          alt='tick'
          placeholder='Search for anime'
          value={searchText}
          onChange={handleSearch}
          required
          className='search_input text-decoration-none peer'
        />
        <button
          type='submit'
          className='submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700'>
            <img src='/assets/icons/tick.svg'/>
        </button>
      </form>
      {/* Search result  */}
      {searchResult? (
        <div className='w-full flex-col mt-10'>
        <p className='orange_gradient subhead_text ml-4'>Based on your search</p>
        <div className='relative flex items-center'>
        <MdChevronLeft size={40} />
        <div className='flex flex-row w-[100vw] h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {searchResult?.map((anime , idx) => (
              <Card anime={anime} key={idx} idx={idx}/>
            ))}
            </div>
          <MdChevronRight size={40} />
        </div>
    </div>
      ) : (<></>)}
    {/* Popular result  */}
    <div className='w-full h-full flex-col mt-10'>
        <p className='orange_gradient subhead_text ml-4'>Popular</p>
        {popularLoading? ( 
        <div className='flex-center mb-10'>
    <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
  </div>) : (
        <div className='relative flex items-center'>
        <MdChevronLeft size={40} />
        <div className='flex flex-row w-full h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {popular?.map((anime , idx) => (
              <Card anime={anime} key={idx} idx={idx}/>
            ))}
            </div>
          <MdChevronRight size={40} />
        </div>
        )}
    </div>
    {/* Top results */}
    <div className='w-full flex-col mt-10'>
        <p className='orange_gradient subhead_text ml-4'>Top Animes</p>
        {popularLoading? ( 
        <div className='flex-center mb-10'>
    <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
  </div>) : (
        <div className='relative flex items-center mb-10'>
        <MdChevronLeft size={40} />
        <div className='flex flex-row w-[100vw] h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {news?.map((anime , idx) => (
              <Card anime={anime} key={idx} idx={idx}/>
            ))}
            </div>
            <MdChevronRight size={40} />
        </div>
        )}
    </div>
    <RandomGenerator/>
    <Footer className='mt-16'/>
    </div>

  )
}

export default Feed