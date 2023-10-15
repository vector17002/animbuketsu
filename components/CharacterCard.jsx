import React from 'react'

const CharacterCard = ({prop}) => {
  return (
    <div className='flex flex-col justify-center items-center rounded-xl'>
        <img src={prop.images?.jpg.image_url} alt='char' className='w-50 h-50 object-contain border-2 border-green-900 rounded-lg'/>
        <p>{prop.name}</p>
    </div> 
  )
}

export default CharacterCard