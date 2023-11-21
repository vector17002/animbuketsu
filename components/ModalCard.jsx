import React from 'react'

const ModalCard = ({handleModal , modalDetail}) => {
  return (
    <div className='w-[100vw] h-[100vh] top-0 bottom-0 left-0 right-0 flex justify-center items-center fixed' onClick={handleModal}>
       {modalDetail.animeName}
    </div>
  )
}

export default ModalCard