import { useRouter } from 'next/navigation';
import Image from 'next/image';
const ReCard = ( { anime , idx} ) => {
  const router = useRouter();
  const handleRoute = (e) =>{
    router.push(`/anime/${anime.entry.mal_id}`)
  }
  return (
    <div onClick={(e) => handleRoute()}
    className='p-2 m-2 rounded-xl flex flex-col justify-between items-center border-amber-300 border-2 cursor-pointer hover:scale-105 relative'>
    <div>
    <Image src={anime.entry.images.jpg.image_url} alt='img' height={100} width={100} className='lg:h-[300px] h-[250px] min-w-[150px] lg:min-w-[200px] rounded-lg'/>
    </div>
    <div>
       <p className='desc'><span className='orange_gradient font-extrabold'>{idx+1}. </span>{anime.entry.title_english? anime.entry.title_english.substr(0,15): anime.entry.title.substr(0,15)}..</p>  
    </div>    
    </div>
  )
}

export default ReCard