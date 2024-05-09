"use client";
import AnimeCard from "@components/AnimeCard";
import Loading from "@utils/Loading";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
          setAdded(true);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please login first");
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
    const checkAdded = async () => {
      try {
        console.log(animeDetail.title_english);
        const response = await (
          await fetch(`/api/profile/${session?.user.id}/list`)
        )
          .json()
          .then((res) => {
            return res;
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
        return false;
      }
      return false;
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
