"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete, MdDeleteOutline, MdLiveTv } from "react-icons/md";
import { TbEyeCancel } from "react-icons/tb";
const ModalCard = ({ handleModal, anime, change }) => {
  const { data: session } = useSession();
  const baseURL = `/api/profile/${session?.user.id}/list`;
  const markComplete = async () => {
    try {
      await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify({
          id: anime._id,
          status: 1
        })
      })
    } catch (error) {
      console.log(error);
    } finally {
      change('completed');
    }
  }
  const markWatching = async () => {
    try {
      await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(
          {
            id: anime._id,
            status: 0,
          }
        )
      })
    } catch (error) {
      console.log(error);
    } finally {
      change('watching')
    }
  }
  const markDelete = async () => {
    try {
      await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(
          {
            id: anime._id,
            del: true
          }
        )
      })
    } catch (error) {
      console.log(error);
    } finally {
      change('watch later')
    }
  }
  const markLater = async () => {
    try {
      await fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(
          {
            id: anime._id,
            status: -1
          }
        )
      })
    } catch (error) {
      console.log(error);
    } finally {
      change('watch later')
    }
  }
  return (
    <div onClick={handleModal}>
      <div className='w-[100vw] h-[100vh] top-0 bottom-0 left-0 right-0 flex justify-center items-center fixed flex flex-col'>
        <div className='flex w-full justify-center items-center' v>
          <img
            src={anime.animeImg}
            alt='image'
            className='object-contain rounded-xl border-2 border-amber-600'
          />
        </div>
        <div className='flex flex-row justify-between items-center gap-5 mt-4'>
          <button type='button' onClick={markComplete} className='flex justify-center item-center flex-row'>
            <p className='text-zinc-500 text-xl'> Completed</p>
            <IoCheckmarkDoneCircleOutline className='h-[30px] w-[30px] mr-2' />
          </button>
          <button type='button' className='flex justify-center item-center flex-row' onClick={markWatching}>
            <p className='text-zinc-500 text-xl'> Watching</p>
            <MdLiveTv className='w-[30px] h-[30px] mr-2' />
          </button>
          <button type='button' className='flex justify-center item-center flex-row' onClick={markDelete}>
            <p className='text-zinc-500 text-xl'>Remove</p>
            <MdDeleteOutline className='w-[30px] h-[30px] mr-2' />
          </button>
          <button type='button' className='flex justify-center item-center flex-row' onClick={markLater}>
            <p className='text-zinc-500 text-xl'>Watch Later</p>
            <TbEyeCancel className='w-[30px] h-[30px] mr-2' />
          </button>
        </div>
      </div>
    </div >
  )
}

export default ModalCard
