"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdDelete, MdDeleteOutline, MdLiveTv } from "react-icons/md";
import { TbEyeCancel } from "react-icons/tb";
const ModalCard = ({ handleModal, anime, change }) => {
  const { data: session } = useSession();
  const baseURL = `/api/profile/${session?.user.id}/list`;
  const markComplete = async () => {
    try {
      await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify({
          id: anime._id,
          status: 1,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      change("completed");
    }
  };
  const markWatching = async () => {
    try {
      await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify({
          id: anime._id,
          status: 0,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      change("watching");
    }
  };
  const markDelete = async () => {
    try {
      await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify({
          id: anime._id,
          del: true,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      change("watch later");
    }
  };
  const markLater = async () => {
    try {
      await fetch(baseURL, {
        method: "POST",
        body: JSON.stringify({
          id: anime._id,
          status: -1,
        }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      change("watch later");
    }
  };
  return (
    <div onClick={handleModal}>
      <div className="fixed bottom-0 left-0 right-0 top-0 flex flex h-[100vh] w-[100vw] flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center" v>
          <img
            src={anime.animeImg}
            alt="image"
            className="rounded-xl border-2 border-amber-600 object-contain"
          />
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-5 lg:flex-row">
          <button
            type="button"
            onClick={markComplete}
            className="item-center flex flex-row justify-center rounded-lg bg-green-500 p-3"
          >
            <p className="text-xl text-white"> Completed</p>
            <IoCheckmarkDoneCircleOutline className="mr-2 h-[30px] w-[30px] text-white" />
          </button>
          <button
            type="button"
            className="item-center flex flex-row justify-center rounded-lg bg-blue-500 p-3"
            onClick={markWatching}
          >
            <p className="text-xl text-white"> Watching</p>
            <MdLiveTv className="mr-3 h-[30px] w-[30px] text-white" />
          </button>
          <button
            type="button"
            className="item-center flex flex-row justify-center rounded-lg bg-rose-500 p-3"
            onClick={markDelete}
          >
            <p className="text-xl text-white">Remove</p>
            <MdDeleteOutline className="mr-2 h-[30px] w-[30px] text-white" />
          </button>
          <button
            type="button"
            className="item-center flex flex-row justify-center rounded-lg bg-indigo-500 p-3"
            onClick={markLater}
          >
            <p className="text-xl text-white">Watch Later</p>
            <TbEyeCancel className="mr-2 h-[30px] w-[30px] text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
