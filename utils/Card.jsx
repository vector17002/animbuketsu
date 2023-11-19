'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
const Card = ( { anime , idx} ) => {
  const router = useRouter();
  const handleRoute = async (e) =>{
    await router.push(`/anime/${anime.mal_id}`)
  }
  return (
    <div onClick={(e)=>handleRoute()}
    className='p-2 m-2 rounded-xl flex flex-col justify-between items-center border-amber-300 border-2 cursor-pointer hover:scale-105 relative'>
    <div>
    <img src={anime.images.jpg.image_url} alt='img' className='lg:h-[300px] h-[250px] min-w-[150px] lg:min-w-[200px] rounded-lg'/>
    </div>
    <div>
       <p className='desc'><span className='orange_gradient font-extrabold'>{idx+1}. </span>{anime.title_english? anime.title_english.substr(0,15): anime.title.substr(0,15)}..</p>  
    </div>    
    </div>
  )
}

export default Card