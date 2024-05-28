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
      change('completed' , 0);
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
      change('watching' , 0)
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
      change('watch later' , 1)
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
      change('watch later' , 0)
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
        <div className='flex flex-col md:flex-row justify-between items-center gap-5  mt-5 md:mt-10'>
          <button type='button' onClick={markComplete} className='flex justify-center item-center flex-row bg-green-400 rounded-lg p-2'>
            <p className='text-white text-xl font-extrabold'> Completed</p>
          </button>
          <button type='button' className='flex justify-center item-center flex-row bg-indigo-400 rounded-lg p-2' onClick={markWatching}>
            <p className='text-white text-xl font-extrabold'> Mark Watching</p>
          </button>
          <button type='button' className='flex justify-center item-center flex-row bg-rose-400 rounded-lg p-2' onClick={markDelete}>
            <p className='text-white text-xl font-extrabold'>Drop</p>
          </button>
          <button type='button' className='flex justify-center item-center flex-row bg-blue-400 rounded-lg p-2' onClick={markLater}>
            <p className='text-white text-xl font-extrabold'>Watch Later</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCard
