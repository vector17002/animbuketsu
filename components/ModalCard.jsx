"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
const ModalCard = ({ handleModal, anime, change }) => {
  const { data: session } = useSession();
  const baseURL = `/api/profile/${session?.user.id}/list`;
  const markComplete = async () => {
    try {
      const response = await fetch(baseURL, {
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
      const response = await fetch(baseURL, {
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
      const response = await fetch(baseURL, {
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
      const response = await fetch(baseURL, {
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
      {anime.animeName}
      <div className='w-[100vw] h-[100vh] top-0 bottom-0 left-0 right-0 flex justify-center items-center fixed'>
        <div className='flex flex-row justify-between items-center gap-4 mt-4'>
          <button type='button' onClick={markComplete}>
            <img src='/assets/icons/tick.svg' className='object-contain rounded-full min-w-[40px] max-w-[40px]' />
          </button>
          <button type='button' onClick={markWatching}>
            <img src='/assets/icons/eye.png' className='object-contain rounded-full border-2 border-black min-w-[40px] max-w-[40px]' />
          </button>
          <button type='button' onClick={markDelete}>
            <img src='/assets/icons/bin.png' className='object-contain rounded-full min-w-[40px] max-w-[40px]' />
          </button>
          <button type='button' onClick={markLater}>
            <img src='/assets/icons/cancel.png' className='object-contain rounded-full border-2 border-black min-w-[40px] max-w-[40px]' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalCard
