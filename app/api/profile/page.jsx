<<<<<<< HEAD
'use client';
import { useSession } from 'next-auth/react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import React, { useEffect, useState } from 'react';
import ModalCard from '@components/ModalCard';
<<<<<<< HEAD
const Wishes = ({ anime, change, modal, detail, idx }) => {
=======
const Wishes = ({ anime, modal, detail, idx }) => {
>>>>>>> 0e89285 (modal upgraded)

=======
"use client";
import { useSession } from "next-auth/react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import React, { useEffect, useState } from "react";
import ModalCard from "@components/ModalCard";
const Wishes = ({ anime, modal, detail, idx }) => {
>>>>>>> 2aca78f (test commit)
  const handleModal = () => {
    detail(anime);
    modal();
  };
  return (
    <div
      onClick={handleModal}
      className="relative m-2 flex cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-amber-300 p-2 hover:scale-105"
    >
      <div>
<<<<<<< HEAD
<<<<<<< HEAD
        <img src={anime.animeImg} alt='img' className='lg:h-[300px] h-[250px] min-w-[175px] lg:min-w-[200px] rounded-lg' />
=======
        <img src={anime.animeImg} alt='img' className='lg:h-[300px] h-[250px] min-w-[150px] lg:min-w-[200px] rounded-lg' />
>>>>>>> 0e89285 (modal upgraded)
=======
        <img
          src={anime.animeImg}
          alt="img"
          className="h-[250px] min-w-[175px] rounded-lg lg:h-[300px] lg:min-w-[200px]"
        />
>>>>>>> 2aca78f (test commit)
      </div>
      <div>
        <p className="desc">
          <span className="orange_gradient font-extrabold">{idx + 1}. </span>
          {anime.title_english
            ? anime.animeName.substr(0, 15)
            : anime.animeName.substr(0, 15)}
          ..
        </p>
      </div>
    </div>
  );
};
const Profile = () => {
  const { data: session } = useSession();
  const [category, setCategory] = useState("watch later");
  const [anime, setAnime] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalDetail, setModalDetail] = useState(null);
  const [fetching, setFetching] = useState(false);
  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        setFetching(true);
        const response = await fetch(`/api/profile/${session?.user.id}/list`, {
          method: "GET",
        });
        const data = response.json();
        const wish = await data.then((result) => {
          return result;
        });
        const wishes = JSON.stringify(wish);
        if (category === "completed") {
          setAnime(
            JSON.parse(wishes).filter((wish) => {
              return wish.status === 1;
            }),
          );
        } else if (category === "watching") {
          setAnime(
            JSON.parse(wishes).filter((wish) => {
              return wish.status === 0;
            }),
          );
        } else {
          setAnime(
            JSON.parse(wishes).filter((wish) => {
              return wish.status === -1;
            }),
          );
        }
        setFetching(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompleted();
  }, [category]);
  const handleDropdown = (e) => {
    setCategory(e.target.value);
  };
  const handleChange = (value) => {
    setCategory(value);
  };
  const handleModal = () => {
    setModal(!modal);
  };
  const getDetail = (value) => {
    setModalDetail(value);
<<<<<<< HEAD
  }
  return (<>
    {modal ? (<ModalCard handleModal={handleModal} anime={modalDetail} change={handleChange} />) : (
      <div className='w-full h-full flex flex-col justify-between items-center'>
        <FormControl className='w-3/5'>
          <InputLabel id="demo-simple-select-label">{category.toUpperCase()}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Watch Later"
            value={category}
            onChange={handleDropdown}
          >
            <MenuItem value={'completed'}>Completed</MenuItem>
            <MenuItem value={'watching'}>Watching</MenuItem>
            <MenuItem value={'watch later'}>Watch Later</MenuItem>
          </Select>
        </FormControl>
        <div className='w-full flex flex-col mt-10'>
          {fetching ? (
            <div className='flex-center mb-10'>
              <img src='/assets/icons/loader.svg' alt='loading' className='w-20 h-20 object-contain' />
            </div>
          ) : (
            <div className='relative flex items-center mb-10'>
<<<<<<< HEAD
              <MdChevronLeft size={40} />
              <div className='flex flex-row w-full h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide gap-5'>
                {anime?.map((anime, idx) => (
                  <Wishes key={anime.animeName} anime={anime} idx={idx} change={handleChange} modal={handleModal} detail={getDetail} />
                ))}
              </div>
              <MdChevronRight size={40} />
=======
              {(anime?.length !== 0) ? (<> <MdChevronLeft size={40} />
                <div className='flex flex-row w-full h-full scroll overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide gap-2'>
                  {anime?.map((anime, idx) => (
                    <Wishes key={anime.animeName} anime={anime} idx={idx} change={handleChange} modal={handleModal} detail={getDetail} />
                  ))}
                </div> </>) : (<></>)}
              {(anime?.length >= 5) ? (<MdChevronRight size={40} />) : (<></>)}
>>>>>>> 0e89285 (modal upgraded)
            </div>
          )}
=======
  };
  return (
    <>
      {modal ? (
        <ModalCard
          handleModal={handleModal}
          anime={modalDetail}
          change={handleChange}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-between">
          <FormControl className="w-3/5">
            <InputLabel id="demo-simple-select-label">
              {category.toUpperCase()}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Watch Later"
              value={category}
              onChange={handleDropdown}
            >
              <MenuItem value={"completed"}>Completed</MenuItem>
              <MenuItem value={"watching"}>Watching</MenuItem>
              <MenuItem value={"watch later"}>Watch Later</MenuItem>
            </Select>
          </FormControl>
          <div className="mt-10 flex w-full flex-col">
            {fetching ? (
              <div className="flex-center mb-10">
                <img
                  src="/assets/icons/loader.svg"
                  alt="loading"
                  className="h-20 w-20 object-contain"
                />
              </div>
            ) : (
              <div className="relative mb-10 flex items-center">
                {anime?.length !== 0 ? (
                  <>
                    {" "}
                    <MdChevronLeft size={40} />
                    <div className="scroll scrollbar-hide flex h-full w-[100vw] flex-row gap-2 overflow-x-scroll scroll-smooth whitespace-nowrap">
                      {anime?.map((anime, idx) => (
                        <Wishes
                          key={anime.animeName}
                          anime={anime}
                          idx={idx}
                          change={handleChange}
                          modal={handleModal}
                          detail={getDetail}
                        />
                      ))}
                    </div>{" "}
                  </>
                ) : (
                  <></>
                )}
                {anime?.length >= 5 ? <MdChevronRight size={40} /> : <></>}
              </div>
            )}
          </div>
>>>>>>> 2aca78f (test commit)
        </div>
      )}
    </>
  );
};
export default Profile;
