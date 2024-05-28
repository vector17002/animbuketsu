import React, { useState } from "react";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

const RandomGenerator = () => {
  const baseUrl = "https://api.jikan.moe/v4/random/anime";
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleGetRandom = async () => {
    setLoading(true);
    const data = await fetch(baseUrl);
    const obj = await data.json();
    setAnime(obj.data);
    setLoading(false);
  };
  return (
    <div className="m-10 mt-5 h-full w-[90vw] md:bg-generator lg:h-[400px] bg-no-repeat bg-cover rounded-lg">
      <div className="flex h-full w-full flex-col items-center justify-evenly lg:flex-row md:bg-black/20 md:backdrop-blur-md rounded-xl">
        <div className="w-50 m-4 flex h-full flex-col items-center justify-center">
          <p className="head_text orange_gradient">Random anime Explorer</p>
          <button
            type="button"
            onClick={handleGetRandom}
            className="m-3 rounded-lg bg-orange-400 p-2 text-white font-extrabold hover:bg-white hover:text-orange-400"
          >
            Explore
          </button>
        </div>
        <div className="w-50 flex h-full items-center">
          {anime ? (
            <div className="w-[250px]">
              {loading ? (
                <img src="/assets/images/generatloading2.gif" alt="loading" />
              ) : (
                <div className="md:h-full rounded-lg lg:bg-white">
                <DirectionAwareHover imageUrl={anime.images.jpg.image_url} id={anime.mal_id}>
              <p className='text-white font-semibold'>{anime.title_english? anime.title_english : anime.title}</p>
              <div className='flex flex-row gap-2 flex-wrap'>{anime.genres.map((genre , idx) => ( 
                <div className='bg-white p-1 rounded-lg' key={idx}>
                <p className='text-xs blue_gradient font-extrabold'>{genre.name}</p>
                </div>
              ))}</div>
               </DirectionAwareHover>
                </div>
              )}
            </div>
          ) : (
           <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomGenerator;
