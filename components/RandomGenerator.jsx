import React, { useState } from 'react'
import  Card  from '../utils/Card.jsx'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
const RandomGenerator = () => {
  const baseUrl = 'https://api.jikan.moe/v4/random/anime'
  const [anime , setAnime] = useState(null)
  const [loading , setLoading] = useState(false)
  const handleGetRandom =  async () =>{
     setLoading(true)
     console.log(anime)
     const data = await fetch(baseUrl);
     const obj = await data.json();
     setAnime(obj.data)
     setLoading(false);
     console.log(anime)
  }
  return (
    <div className='w-[100vw] lg:h-[400px] h-full mt-5 m-10 lg:bg-generator bg-cover'>
    <div className='w-full h-full lg:backdrop-blur-lg lg:bg-white/30 flex items-center justify-evenly lg:flex-row flex-col'>
       <div className='h-full w-50 flex flex-col justify-center items-center m-4'>
       <p className='head_text text-purple-900'>Random anime generator</p>
       <p className='subhead_text mt-0'>Confuse for what to watch now? Dont worry we've got you!!!</p>
       <button type='button' onClick={handleGetRandom} className='p-2 bg-purple-400 text-white rounded-xl hover:bg-white hover:text-purple-400 m-3'>Generate</button>
       </div>
       <div className='flex w-50 h-full items-center'>
       {anime ? ( 
        <div className='w-[250px]'>
        {loading ? ( <img src='/assets/images/generatloading2.gif' alt='loading'/>) : (
          <div className= 'w-[250px] h-full lg:bg-white rounded-lg'>
          <Card anime={anime} idx={0}/>
          </div>
        )}
          </div>
       ) : ( <img src='/assets/images/pikachu.gif' alt='Welcome' className='h-full object-contain'/>)}
       </div>
    </div>
    </div>
  )
}

export default RandomGenerator