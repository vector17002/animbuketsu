'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
const Wishes = ({anime , idx}) =>{
  const [completed , setCompleted] = useState(anime.completed);
  const total = anime.episodes;
  const {data : session} = useSession();
  const handleAdd = async (e) =>{
    if(completed === total)
    {
      alert(`Congratulation on completing ${anime.animeName}`);
      return ;
    } 
    setCompleted(completed+1);
  }
  const handleMinus =(e) =>{
    if(completed === 0)
    {
      alert('Oops I think you are checking my programming logic !!');
      return;
    }
    setCompleted(completed-1);
  }

  return (
    <div 
    className='rounded-xl flex flex-col justify-between items-center glassmorphism cursor-pointer'>
    <div>
    <img src={anime.animeImg} alt='img' className='lg:h-[300px] h-[250px] rounded-lg'/>
    </div> 
     
    </div>
  )
}
const Profile = () => {
  const {data : session} = useSession();
  const [list , setList] = useState([]);
  useEffect(()=>{
    const fetchList = async ()=>{
        const response = await fetch(`/api/profile/${session?.user.id}/list`);
        const data = response.json();
        const wish = await data.then((result)=>{
          return result;
        })
        const wishes = JSON.stringify(wish)
        setList(JSON.parse(wishes))
    }
    fetchList();
  },[])
    
  return (
    <div className='w-full h-full flex flex-col justify-between items-center'>
    <p className='orange_gradient subhead_text'>Continue-watching</p>
    <div className='grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-5 mt-5'>
    {list ? list.map((anime , idx)=>(
       anime.status === -1 ? 
      ( <Wishes key={anime.animeName} anime={anime} idx={idx}/>) : (<></>)
    )) : (<>
      There are no anime added 
    </>)}</div>
    <p className='orange_gradient subhead_text'>Completed</p>
    <div className='grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-5 mt-5'>
    {list?.map((anime , idx)=>(
       anime.status === 1 ? 
      ( <Wishes key={anime.animeName} anime={anime} idx={idx}/>) : (<></>)
    ))}
    </div>
    </div>
  )
}
export default Profile
