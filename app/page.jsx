import Feed from '@components/Feed'
import Link from 'next/link'
import React from 'react'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col'>
       <h1 className='head_text text-center orange_gradient'>
        Anime Bucket
       </h1>
       <p className='desc text-center'>
        Anime bucket is an all in one website which helps you to explore and manage your favourite animes in one place.
    </p>
    {/* <Link href='/home'><button className='px-4 py-2 bg-emerald-500 m-4 text-white rounded-lg fond-bold'>Explore</button></Link> */}
    <Feed/>
    </section>
  )
}
export default Home