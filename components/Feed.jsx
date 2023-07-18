'use client';
import Card from '@utils/Card';
import React , {useState , useEffect} from 'react'
import Footer from './Footer';
import CardSkeleton from '@utils/CardSkeleton';
import { BrowserView , MobileView } from 'react-device-detect';
const Feed = () => {
  const baseUrl ='https://api.jikan.moe/v4';
  const [popular , setPopular] = useState(null);
  const [popularLoading , setPopularLoading] = useState(false);
  const [searchText , setSearchText] = useState('');
  const [searchResult , setSearchResult] = useState(null);
  useEffect(()=>{
    const getPopular = async ()=>{
      try {
        setPopularLoading(true);
         const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
         const obj = await response.json();
         setPopular(obj.data);
      } catch (error) {
         console.log(error);
         alert('Oops we are out of api requests');
      }   
      finally{
        setPopularLoading(false);
      }
    }
    getPopular();  
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
      console.log(error);
    }
  }
  return (
    <div className='w-full flex flex-col mt-16 justify-center items-center'>
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
        <div className='w-full flex-col'>
        <p className='orange_gradient subhead_text'>Based on your search</p>
        <div className='grid sm:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-5 mt-5'>
            {searchResult?.map((anime , idx) => (
              <Card anime={anime} key={idx} idx={idx}/>
            ))}
        </div> 
    </div>
      ) : (<></>)}
    {/* Popular result  */}
    <div className='w-full flex-col mt-16'>
        <p className='orange_gradient subhead_text'>Popular</p>
        {popularLoading? ( 
          <>
        <BrowserView>
        <div className='grid sm:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-10 mt-5 mb-10'>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        </div>
        </BrowserView>
        <MobileView className='flex-center mb-10'>
    <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
  </MobileView></>) : (
          <div className='grid sm:grid-cols-3 lg:grid-cols-5 grid-cols-2 lg:gap-7 gap-3 mt-5 mb-10'>
            {popular?.map((anime , idx) => (
              <Card anime={anime} key={idx} idx={idx}/>
            ))}
        </div>
        )}
    </div>
    <Footer/>
    </div>

  )
}

export default Feed