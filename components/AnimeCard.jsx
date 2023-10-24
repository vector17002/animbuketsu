import Link from 'next/link';
import React, { useEffect, useState } from 'react'
const AnimeCard = ({animeDetail , handleAdd , added}) => {
  const [showMore , setShowMore] = useState(false);
  const [showTrailer , setShowTrailer] = useState(false);
  const [characters , setCharacters] = useState(null);
  useEffect(()=>{
     const data = fetch(`https://api.jikan.moe/v4/anime/${animeDetail.mal_id}/characters`);
     data.then((result)=>{
       result.json().then((response)=> {
      setCharacters(response.data);
      console.log(characters)});
     }).catch((error)=>{
      console.log(error);
     })
     },[])
  return (
    <div className='w-full h-full flex flex-col'>
    <div className="w-full h-full sm:flex xs:flex-row justify-between p-3 m-3">
       <div className='flex flex-col gap-5 items-center px-2 m-2 rounded-xl glassmorphism max-h-[450px]'>
           <img
            src={animeDetail.images.jpg.image_url}
            alt='image'
            className='object-contain rounded-xl border-2 border-amber-600'
           />

           <p className='text-md text-gray-600'><span className='orange_gradient'>Genre: </span>
           {animeDetail.genres.map((genre)=>(
            genre.name + ' | '
           ))}
           </p>
       </div>
       <div className='flex flex-col h-full p-2 m-2'>
        <p className='orange_gradient font-inter text-2xl font-bold p-2'>{animeDetail.title_english}</p>
        <div className='flex flex-col'>
         <div className='flex items-center m-2 gap-5'>
        <p className='green_gradient text-xl font-bold '><span className='desc'>Rank: </span> {animeDetail.rank} </p>
        <p className='blue_gradient text-xl font-bold'><span className='desc'>Score: </span>{animeDetail.score}</p>
        </div>
        <div className='flex items-center m-2 gap-5'>
         <p className='text-gray-600 text-[15px] font-bold '>Episodes: {animeDetail.episodes}</p>
         <p className='text-gray-600 text-[15px] font-bold '>{animeDetail.rating?.substr(0,6)}</p>
         <p className='text-gray-600 text-[15px] font-bold '>{animeDetail.status === "Finished Airing" ? 'Completed' : animeDetail.broadcast.day}</p>
         </div>
         </div>
         <p className='text-gray-600 text-[15px] max-w-2xl m-2'>{showMore ?  animeDetail.synopsis : animeDetail.synopsis?.substr(0,400)} <button type='button' className='blue_gradient underline' onClick={()=>setShowMore(!showMore)}>{showMore ? 'Read less' : '. . Read more'}</button></p>
         {/* trailer  */}
         <div className='flex justify-between items-center m-2'>
            <button type='button' className='bg-green-500 hover:bg-green-950 hover:text-white p-1 sm:p-2 rounded-lg text-bolder text-xl' onClick={()=>setShowTrailer(!showTrailer)}>{showTrailer ? 'Close' : 'Watch Trailer' }</button>
            <button type='button' className='p-3' onClick={handleAdd}>{added ? ( <img src='/assets/icons/tick.svg' alt='Added' className='object-contain' width={35} height={35}/>) : (<img src='/assets/icons/plus.png' alt='Add to list' className='object-contain' width={35} height={35}/>)}</button>
         </div>
         {showTrailer ? (
          <div className='flex-center rounded-full glassmorphism'>
            <iframe
            src={animeDetail.trailer?.embed_url}
            title={animeDetail.title}
            frameBorder='0'
            allowFullScreen
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            className='w-full h-[300px] rounded-xl border-2 border-green-800'>
            </iframe>
          </div>
         ):(<></>)}
       </div>
       <div className='flex flex-col gap-10 glassmorphism rounded-xl m-2 p-3 text-gray-600 font-bold text-[14px] max-h-[450px]'>
            <p><span className='orange_gradient'> Title: </span> {animeDetail.title}</p>
            <p><span className='orange_gradient'> Year: </span>  {animeDetail.year ? animeDetail.year : animeDetail.aired.from.substr(0,4)}</p>            
            <p><span className='orange_gradient'> Season: </span> {animeDetail.season ? animeDetail.season : '0'}</p>            
            <p><span className='orange_gradient'> Duration: </span> {animeDetail.duration}</p>            
            <p><span className='orange_gradient'> Aired: </span> {animeDetail.aired.from.substr(0,10)}</p>            
       </div>
    </div>
    </div>
  )
}

export default AnimeCard