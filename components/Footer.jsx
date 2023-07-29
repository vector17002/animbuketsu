import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
  return (
    <div className='w-[98vw] h-[150px] flex justify-between items-center bg-footer-image p-5'>
    <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>AniBuketsu</p>
      </Link>
      <p className='logo_text'>Developed by : Ansh kumain</p>
        <div className='flex justify-center items-center gap-2'>
          <Link
          href='https://github.com/vector17002/animbuketsu'>
           <Image
            src='/assets/icons/github.png'
            width={30}
            height={30}
            className='object-contain'
           />
          </Link>
          <Link
          href='https://www.linkedin.com/in/ansh-kumain/'>
           <Image
            src='/assets/icons/linked.png'
            width={30}
            height={30}
            className='object-contain'
           />
          </Link>
          <Link
          href='https://ansh-portfolio-blond.vercel.app/'>
           <Image
            src='/assets/icons/contact2.png'
            width={30}
            height={30}
            className='object-contain bg-transparent'
           />
          </Link>
        </div>
    </div>
  )
}

export default Footer