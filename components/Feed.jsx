'use client';

import React , {useState , useEffect} from 'react'
import Footer from './Footer';
import { BrowserView, MobileView} from 'react-device-detect'
import RandomGenerator from './RandomGenerator';
import toast from 'react-hot-toast';
import { DirectionAwareHover } from './ui/direction-aware-hover';
import Image from 'next/image';
import { DirectionAwareHoverMobile } from './ui/direction-aware-mobile';
const Feed = () => {
  const baseUrl ='https://api.jikan.moe/v4';
  const [popular , setPopular] = useState(null);
  const [popularLoading , setPopularLoading] = useState(false);
  const [searchText , setSearchText] = useState('');
  const [top , setTop] = useState(null)
  const [topLoading , setTopLoading] = useState(false)
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
    const getTop = async () =>{
      try {
        setTopLoading(true);
         const response = await fetch(`${baseUrl}/top/anime`);
         const obj = await response.json();
         setTop(obj.data);
      } catch (error) {
         toast.error('Oops we are out of api requests');
      }   
      finally{
        setTopLoading(false);
      }
    }
    getPopular();
    setTimeout(() => {
      getTop();
    } , 1500)
   
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
            <Image src='/assets/icons/tick.svg' height={20} width={20}/>
        </button>
      </form>
      {/* Search result  */}
      {searchResult? (
        <div className='w-[98vw] flex-col mt-10'>
        <p className='orange_gradient subhead_text ml-4'>Based on your search</p>
        <div className='relative flex items-center'>
        <div className='flex flex-row w-[100vw] h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide gap-3 md:gap-6 m-3'>
            {searchResult?.map((anime , idx) => (
              <>
              <BrowserView>
              <DirectionAwareHover imageUrl={anime.images.jpg.image_url} id={anime.mal_id} key={idx}>
              <div className='bg-white p-1 rounded-full w-8 flex justify-center items-center'>
              <p className='font-extrabold orange_gradient text-sm md:text-md'>{idx+1}</p></div>
              <p className='text-white font-semibold text-sm md:text-md'>{anime.title_english? anime.title_english : anime.title}</p>
              <div className='flex flex-row gap-2 flex-wrap'>{anime.genres.map((genre , idx) => ( 
                <div className='bg-white p-1 rounded-lg' key={idx}>
                <p className='text-xs blue_gradient md:font-extrabold'>{genre.name}</p>
                </div>
              ))}</div>
               </DirectionAwareHover>
               </BrowserView>
               <MobileView>
               <DirectionAwareHoverMobile imageUrl={anime.images.jpg.image_url} id={anime.mal_id} key={idx}>
              <div className='bg-white p-1 rounded-full w-8 flex justify-center items-center'>
              <p className='font-extrabold orange_gradient text-sm md:text-md'>{idx+1}</p></div>
              <p className='text-white font-semibold text-sm md:text-md'>{anime.title_english? anime.title_english : anime.title}</p>
              <div className='flex flex-row gap-2 flex-wrap'>{anime.genres.map((genre , idx) => ( 
                <div className='bg-white p-1 rounded-lg' key={idx}>
                <p className='text-xs blue_gradient md:font-extrabold'>{genre.name}</p>
                </div>
              ))}</div>
               </DirectionAwareHoverMobile>
               </MobileView>
               </>
            ))}
            </div>
        </div>
    </div>
      ) : (<></>)}
    {/* Popular result  */}
    <div className='w-[98vw] h-full flex-col mt-10'>
        <p className='orange_gradient subhead_text ml-4'>Popular</p>
        {popularLoading? ( 
        <div className='flex-center mb-10'>
    <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
  </div>) : (
        <div className='relative flex items-center'>
        <div className='flex flex-row w-full h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide gap-3 md:gap-6 m-3'>
            {popular?.map((anime , idx) => (
              <>
              <BrowserView>
              <DirectionAwareHover imageUrl={anime.images.jpg.image_url} id={anime.mal_id} key={idx}>
              <div className='bg-white p-1 rounded-full w-8 flex justify-center items-center'>
              <p className='font-extrabold orange_gradient text-sm md:text-md'>{idx+1}</p></div>
              <p className='text-white font-semibold text-sm md:text-md'>{anime.title_english? anime.title_english : anime.title}</p>
              <div className='flex flex-row gap-2 flex-wrap'>{anime.genres.map((genre , idx) => ( 
                <div className='bg-white p-1 rounded-lg' key={idx}>
                <p className='text-xs blue_gradient md:font-extrabold'>{genre.name}</p>
                </div>
              ))}</div>
               </DirectionAwareHover>
               </BrowserView>
               <MobileView>
               <DirectionAwareHoverMobile imageUrl={anime.images.jpg.image_url} id={anime.mal_id} key={idx}>
              <div className='bg-white p-1 rounded-full w-8 flex justify-center items-center'>
              <p className='font-extrabold orange_gradient text-sm md:text-md'>{idx+1}</p></div>
              <p className='text-white font-semibold text-sm md:text-md'>{anime.title_english? anime.title_english : anime.title}</p>
              <div className='flex flex-row gap-2 flex-wrap'>{anime.genres.map((genre , idx) => ( 
                <div className='bg-white p-1 rounded-lg' key={idx}>
                <p className='text-xs blue_gradient md:font-extrabold'>{genre.name}</p>
                </div>
              ))}</div>
               </DirectionAwareHoverMobile>
               </MobileView>
               </>
            ))}
            </div>
        </div>
        )}
    </div>
    <RandomGenerator/>
    {/* Top rated */}
    <div className='w-[98vw] h-full flex-col'>
        <p className='orange_gradient subhead_text ml-4'>Top Picks</p>
        {topLoading? ( 
        <div className='flex-center mb-10'>
    <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
  </div>) : (
        <div className='relative flex items-center'>
        <div className='flex flex-row w-full h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide gap-3 md:gap-6 m-3'>
            {top?.map((anime , idx) => (
              <>
              <BrowserView>
              <DirectionAwareHover imageUrl={anime.images.jpg.image_url} id={anime.mal_id} key={idx}>
              <div className='bg-white p-1 rounded-full w-8 flex justify-center items-center'>
              <p className='font-extrabold orange_gradient text-sm md:text-md'>{idx+1}</p></div>
              <p className='text-white font-semibold text-sm md:text-md'>{anime.title_english? anime.title_english : anime.title}</p>
              <div className='flex flex-row gap-2 flex-wrap'>{anime.genres.map((genre , idx) => ( 
                <div className='bg-white p-1 rounded-lg' key={idx}>
                <p className='text-xs blue_gradient md:font-extrabold'>{genre.name}</p>
                </div>
              ))}</div>
               </DirectionAwareHover>
               </BrowserView>
               <MobileView>
               <DirectionAwareHoverMobile imageUrl={anime.images.jpg.image_url} id={anime.mal_id} key={idx}>
              <div className='bg-white p-1 rounded-full w-8 flex justify-center items-center'>
              <p className='font-extrabold orange_gradient text-sm md:text-md'>{idx+1}</p></div>
              <p className='text-white font-semibold text-sm md:text-md'>{anime.title_english? anime.title_english : anime.title}</p>
              <div className='flex flex-row gap-2 flex-wrap'>{anime.genres.map((genre , idx) => ( 
                <div className='bg-white p-1 rounded-lg' key={idx}>
                <p className='text-xs blue_gradient md:font-extrabold'>{genre.name}</p>
                </div>
              ))}</div>
               </DirectionAwareHoverMobile>
               </MobileView>
               </>
            ))}
            </div>
        </div>
        )}
    </div>
    <div className='w-full flex flex-row justify-start ml-10 mt-5 mb-5'><Image src='/assets/images/sharebg.gif' width={80} height={80} className='object-cover rounded-full'/> <div className='w-full flex flex-col justify-center ml-2'> <p className='orange_gradient font-extrabold'>Share Animebucket</p> <p className='text-sm font-semibold text-slate-500'> To your friends</p> </div></div>
    <Footer className='mt-16'/>
    </div>

  )
}

export default Feed