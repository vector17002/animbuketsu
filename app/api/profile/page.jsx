'use client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import CardSkeleton from '@utils/CardSkeleton';
import { BrowserView , MobileView } from 'react-device-detect';
const Wishes = ({anime , idx}) =>{
  const [completed , setCompleted] = useState(anime.completed);
  const total = anime.episodes;
  const {data : session} = useSession();
  // const handleAdd = async (e) =>{
  //   if(completed === total)
  //   {
  //     alert(`Congratulation on completing ${anime.animeName}`);
  //     return ;
  //   } 
  //   setCompleted(completed+1);
  // }
  // const handleMinus =(e) =>{
  //   if(completed === 0)
  //   {
  //     alert('Oops I think you are checking my programming logic !!');
  //     return;
  //   }
  //   setCompleted(completed-1);
  // }

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
  const [fething , setFething] = useState(false);
  useEffect(()=>{
    const fetchList = async ()=>{
      try{
        setFething(true);
        const response = await fetch(`/api/profile/${session?.user.id}/list`);
        const data = response.json();
        const wish = await data.then((result)=>{
          return result;
        })
        const wishes = JSON.stringify(wish)
        setList(JSON.parse(wishes))
        setFething(false);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchList();
  },[])
    
  return (
    <div className='w-full h-full flex flex-col justify-between items-center'>
    <p className='orange_gradient subhead_text'>Wishlist</p>
    {fething? ( <>
        <BrowserView>
        <div className='grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-10 mt-5 mb-10'>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        <CardSkeleton/>
        </div>
        </BrowserView>
        <MobileView className='flex-center mb-10'>
    <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
  </MobileView></>) : (
      <div className='grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-2 sm:gap-5 mt-5'>
    {list?list.map((anime , idx)=>(
      <Wishes key={anime.animeName} anime={anime} idx={idx}/>
    )) : (<>
      There are no anime added 
    </>)}
    </div>
    )}
    </div>
  )
}
export default Profile