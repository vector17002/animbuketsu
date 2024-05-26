"use client";
import AnimeCard from "@components/AnimeCard";
import Loading from "@utils/Loading";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ReCard from "@utils/RecommendedCard";
const AnimeProfile = () => {
  const baseUrl = "https://api.jikan.moe/v4";
  const url = location.pathname;
  const [animeDetail, setAnimeDetail] = useState(null);
  const { data: session } = useSession();
  const [added, setAdded] = useState(false);
  const [similar , setSimilar] = useState(null)
  const [similarLoading , setSimilarLoading] = useState(false)
  const addToList = async () => {
    if (session) {
      try {
        const response = await fetch("/api/profile/add", {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            animeImg: animeDetail.images.jpg.image_url,
            animeName: (animeDetail.title_english? animeDetail.title_english : animeDetail.title),
            episodes: animeDetail.episodes? animeDetail.episodes : 0,
          }),
        });
        if (response.ok) {
          toast.success("Added to your bucket")
          setAdded(true);
        }
        else{
          toast.error("Already added to your bucket");
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error("Please login first");
    }
  };
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}${url}`);
        const obj = await response.json();
        setAnimeDetail(obj.data);
      } catch (error) {
        toast.success("Hold on a second")
        location.reload()
      }
    };
    const getSimilar = async () =>{
      try{
        setSimilarLoading(true)
        const response = await fetch(`${baseUrl}${url}/recommendations`)
        const obj = await response.json();
        setSimilar(obj.data)
      }catch(error){
        toast.error("Oops something wrong happened")
      }finally{
        setSimilarLoading(false)
      }
    }
    getDetails();
    getSimilar()
  }, [url]);
  return (
    <div className="mb-5 mt-5 flex flex-col items-center justify-center">
      <div className="h-full w-full">
        {animeDetail ? (
          <AnimeCard
            animeDetail={animeDetail}
            handleAdd={addToList}
            added={added}
          />
        ) : (
          <div>
            <Loading />
          </div>
        )}
        <div className='w-full h-full flex-col mt-10'>
        <p className='blue_gradient subhead_text ml-4 mb-3'>Recommendations For You</p>
        {similarLoading? ( 
        <div className='flex-center mb-10 min-w-[90vw]'>
    <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain'/>
  </div>) : (
        <div className='relative flex items-center'>
        <div className='flex flex-row min-w-[90vw] max-w-[90vw] h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'>
            {similar?.map((anime , idx) => (
              <ReCard anime={anime} key={idx} idx={idx}/>
            ))}
            </div>
        </div>
        )}
    </div>
        </div>
      </div>
  );
};
export default AnimeProfile;
