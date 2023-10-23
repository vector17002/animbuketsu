'use client';
import { useSession } from 'next-auth/react';
import { FormControl , InputLabel , Select , MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
const Wishes = ({anime}) =>{
  const {data : session} = useSession();
  const markComplete = async ()=>{
    try {
       const response = await fetch(`/api/profile/${session?.user.id}/list`, {
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
      const response = await fetch(`/api/profile/${session?.user.id}/list`, {
        method: 'POST',
        body: JSON.stringify(
          {
            userId : session?.user.id,
            animeName: anime.animeName,
            status: 0
          }
        )
      })
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='rounded-xl flex flex-col justify-between items-center glassmorphism cursor-pointer'>
    <div>
    <img src={anime.animeImg} alt='img' className='lg:h-[300px] h-[250px] rounded-lg'/>
    </div> 
    <div className='flex flex-row justify-between items-center gap-4 mt-4'>
      <button type='button' className='bg-green-500 hover:bg-green-800 hover:text-white p-1 sm:p-2 rounded-lg text-bolder' onClick={markComplete}>Complete</button>
      <button type='button' className='bg-amber-500 hover:bg-amber-800 hover:text-white p-1 sm:p-2 rounded-lg text-bolder' onClick={markWatching}>Incomplete</button>
    </div>
    </div>
  )
}
const Profile = () => {
  const {data : session} = useSession();
  const [category , setCategory] = useState('wish');
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
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Wish"
    value={category}
    onChange={handleDropdown}
  >
    <MenuItem value={'completed'}>Completed</MenuItem>
    <MenuItem value={'watching'}>Watching</MenuItem>
    <MenuItem value={'wishlist'}>Watch Later</MenuItem>
  </Select>
</FormControl>
<div className='w-full flex flex-col justify-between items-center'>
  {fetching? (
   <div className='flex-center mb-10'>
   <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
   </div>
   ) : (
     <div className='grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2 sm:gap-5 mt-5 items-center'>
    {anime?anime.map((anime , idx)=>(
    <Wishes key={anime.animeName} anime={anime} idx={idx}/>
   )) : (<p className='blue_gradient subhead_text justify-items-center'>
     Oops no result found
   </p>)}
   </div>
    )}
    </div>
</div>
  )
}
export default Profile