"use client";
import AnimeCard from "@components/AnimeCard";
import Loading from "@utils/Loading";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const AnimeProfile = () => {
  const baseUrl = "https://api.jikan.moe/v4";
  const url = location.pathname;
  const [animeDetail, setAnimeDetail] = useState(null);
  const { data: session } = useSession();
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const addToList = async () => {
    console.log(animeDetail)
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
          toast.success("Added to wish list")
          setAdded(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please login first");
      router.push("/");
    }
  };
  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await fetch(`${baseUrl}${url}`);
        const obj = await response.json();
        setAnimeDetail(obj.data);
      } catch (error) {
        console.log(error);
        location.reload();
      }
    };
    getDetails();
  }, []);
  return (
    <div className="mb-5 mt-5 flex flex-col items-center justify-center">
      <div className="max-h-2xl w-full">
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
      </div>
    </div>
  );
};
export default AnimeProfile;
