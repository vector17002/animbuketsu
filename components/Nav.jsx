'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState , useEffect } from 'react'
import {signIn , signOut , useSession , getProviders} from 'next-auth/react'
import { useRouter } from 'next/navigation';
const Nav = () => {
  const router = useRouter()
  const { data: session} = useSession();
  const [providers , setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(()=>{
      const setProvider = async () =>{
        const response = await getProviders();
        setProviders(response);
      }
      setProvider();
  } , [])

  const handleRoute = async () =>{
    await router.back()
  }
  return (
    <nav className='flex-between w-full mb-10 pt-3 xs:glassmorphism'>
       <div className='flex gap-2 flex-center' onClick={(e) => handleRoute()}>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>AniBuketsu</p>
      </div>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <button type='button' onClick={signOut} className='black_btn'>
              Sign Out
            </button>
            <Link href='/api/profile'>
            <Image
                src={session?.user.image}
                width={35}
                height={35}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ):(
          <>
               {providers && 
                Object.values(providers).map((provider)=>(
                  <button
                  type='button'
                  key = {provider.name}
                  onClick={ () => signIn(provider.id)}
                  className='black_btn'
                  >
                   Sign In
                  </button>
                ))
               }
          </>
        )}
      </div>

      {/* Mobile Navigation  */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={35}
              height={35}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/api/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav