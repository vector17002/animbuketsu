import React, { useState } from "react";
import Card from "../utils/Card.jsx";

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
    <div className="m-10 mt-5 h-full w-[100vw] bg-transparent lg:h-[400px]">
      <div className="flex h-full w-full flex-col items-center justify-evenly lg:flex-row lg:bg-white/30 lg:backdrop-blur-lg">
        <div className="w-50 m-4 flex h-full flex-col items-center justify-center">
          <p className="head_text text-indigo-700">Random anime generator</p>
          <p className="subhead_text mt-0">
            Confuse for what to watch now? Dont worry we've got you!!!
          </p>
          <button
            type="button"
            onClick={handleGetRandom}
            className="m-3 rounded-xl bg-indigo-400 p-2 text-white hover:bg-white hover:text-purple-400"
          >
            Generate
          </button>
        </div>
        <div className="w-50 flex h-full items-center">
          {anime ? (
            <div className="w-[250px]">
              {loading ? (
                <img src="/assets/images/generatloading2.gif" alt="loading" />
              ) : (
                <div className="h-full w-[250px] rounded-lg lg:bg-white">
                  <Card anime={anime} idx={0} />
                </div>
              )}
            </div>
          ) : (
            <img
              src="/assets/images/pikachu.gif"
              alt="Welcome"
              className="h-full object-contain"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RandomGenerator;
