'use client';
import { useSession } from 'next-auth/react';
import { FormControl , InputLabel , Select , MenuItem } from '@mui/material';
import {MdChevronLeft , MdChevronRight} from 'react-icons/md'
import React, { useEffect, useState } from 'react';
const Wishes = ({anime}) =>{
  const {data : session} = useSession();
  const baseURL = `/api/profile/${session?.user.id}/list`;
  const markComplete = async ()=>{
    try {
       const response = await fetch(baseURL, {
        method: 'POST',
        body : JSON.stringify({
          userId : session?.user.id,
          animeName : anime.animeName,
          status : 1
        })
       })
    } catch (error) {
      console.log(error); 
    }
  }
  const markWatching = async ()=>{
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(
          {
            userId : session?.user.id,
            animeName: anime.animeName,
            status: 0,

          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  }
  const markDelete = async ()=>{
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(
          {
            userId : session?.user.id,
            animeName: anime.animeName,
            del : true
          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='rounded-xl flex flex-col justify-center items-center cursor-pointer border-2 border-blue-100  p-3 bg-white'>
    <div>
    <img src={anime.animeImg} alt='img' className='lg:h-[300px] h-[250px] rounded-lg'/>
    </div> 
    <div className='flex flex-row justify-between items-center gap-4 mt-4'>
      <button type='button' onClick={markComplete}>
      <img src='/assets/icons/tick.svg' className='object-contain rounded-full min-w-[40px] max-w-[40px]'/>
      </button>
      <button type='button'  onClick={markWatching}>
        <img src='/assets/icons/cancel.png' className='object-contain rounded-full border-2 border-black min-w-[40px] max-w-[40px]' />
      </button>
      <button type='button' onClick={markDelete}>
       <img src='/assets/icons/bin.png' className='object-contain rounded-full min-w-[40px] max-w-[40px]'/>
      </button>
      <button type='button'>
        <img src='/assets/icons/eye.png' className='object-contain rounded-full border-2 border-black min-w-[40px] max-w-[40px]'/>
      </button>
    </div>
    </div>
  )
}
const Profile = () => {
  const {data : session} = useSession();
  const [category , setCategory] = useState('watch later');
  const [anime , setAnime] = useState(null);
  const [fetching , setFetching] = useState(false);
  useEffect(()=>{
    const fetchCompleted = async ()=>{
      try{
        setFetching(true);
        const response = await fetch(`/api/profile/${session?.user.id}/list`, {
          method: 'GET'
        });
        const data = response.json();
        const wish = await data.then((result)=>{
          return result;
        })
        const wishes = JSON.stringify(wish)
        if(category === 'completed'){
        setAnime(JSON.parse(wishes).filter((wish)=>{
          return wish.status === 1;
        }))
      } else if(category === 'watching'){
        setAnime(JSON.parse(wishes).filter((wish)=>{
          return wish.status === 0;
        }))
      }else{
        setAnime(JSON.parse(wishes).filter((wish)=>{
          return wish.status === -1;
        }))
      }
      setFetching(false);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchCompleted();
  },[category])
  const handleDropdown = (e) =>{
     setCategory(e.target.value)
  }
  return(
  <div className='w-full h-full flex flex-col justify-between items-center'>
  <FormControl className='w-3/5'>
  <InputLabel id="demo-simple-select-label">{category.toUpperCase()}</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Watch Later"
    value={category}
    onChange={handleDropdown}
  >
    <MenuItem value={'completed'}>Completed</MenuItem>
    <MenuItem value={'watching'}>Watching</MenuItem>
    <MenuItem value={'watch later'}>Watch Later</MenuItem>
  </Select>
</FormControl>
<div className='w-full flex flex-col mt-10'>
  {fetching? (
   <div className='flex-center mb-10'>
   <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
   </div>
   ) : (
   <div className='relative flex items-center mb-10'>
   <MdChevronLeft size={40}/>
        <div className='flex flex-row w-full h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide gap-5'>
            {anime?.map((anime , idx) => (
              <Wishes key={anime.animeName} anime={anime} idx={idx}/>
            ))}
            </div>
            <MdChevronRight size={40}/>
        </div>
    )}
    </div>
</div>
  )
}
export default Profile