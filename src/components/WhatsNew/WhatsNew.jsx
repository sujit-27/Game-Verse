import React, { useEffect } from "react";
import { FaHeartbeat, FaWindows } from "react-icons/fa";
import { IoLogoAndroid, IoLogoApple, IoLogoBuffer, IoLogoDribbble } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewGames } from "../../features/WhatsnewSlice";
import { fetchGameDescriptionBySlug } from "../../features/articlesSlice";
import {useNavigate} from 'react-router-dom'

const WhatsNew = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => state.theme.mode);
    const { data: newGames = [], loading } = useSelector((state) => state.newGames || {});
    const { data: articles} = useSelector((state) => state.articles)
    const descriptions = useSelector((state) => state.articles.descriptions); 
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchNewGames());
        articles.forEach(article => {
            if (article.slug) {
                dispatch(fetchGameDescriptionBySlug(article.slug))
            }
        })
    }, [dispatch,articles]);

    return (
    <div id="whatsnew" className="py-10 bg-primary text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header section */}
       <div className={`flex justify-between flex-wrap gap-4 items-center 
        ${theme === 'light' ? ' text-black' : ' text-white'} 
        px-4 py-3 rounded-xl transition`}>
        
        <h1 className="text-2xl sm:text-3xl font-bold">What's New</h1>

        <div className="flex gap-4 items-center">
            <div className="flex gap-4 items-center">
            <IoLogoAndroid className="text-lg sm:text-xl cursor-pointer" />
            <IoLogoApple className="text-lg sm:text-xl cursor-pointer" />
            <IoLogoBuffer className="text-lg sm:text-xl cursor-pointer" />
            <IoLogoDribbble className="text-lg sm:text-xl cursor-pointer" />
            </div>

            <button
            onClick={() => navigate("/new-games")}
            className={`${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-300 hover:bg-gray-600/70'
              } font-semibold ${theme === 'dark' ? 'text-white' : 'text-black/70'} rounded-xl px-4 py-2 transition cursor-pointer`}
            >
            Explore
            </button>
        </div>
        </div>


        {/* What's New Card section */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 my-8">
  {/* Combined Card section inside one shared background */}
  <div className={`col-span-3 p-4 rounded-2xl space-y-6 ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-[#2f2fac4c] text-black'}`}>
    {loading ? (
      Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="flex gap-4 items-center animate-pulse">
          <div className="h-[150px] w-[200px] bg-gray-300 rounded-2xl"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))
    ) : newGames.length > 0 ? (
      [...newGames] // clone to avoid mutating original state
        .filter((game) => game.background_image)
        .sort(() => Math.random() - 0.5) // shuffle array
        .slice(0, 3)
        .map((game) => (
        <div key={game.id} className="flex flex-col sm:flex-row items-center gap-4">
          {game.background_image ? (
            <img
              src={game.background_image}
              alt={game.name}
              className="object-cover h-[150px] w-full sm:w-[200px] rounded-2xl"
            />
          ) : (
            <div className="h-[150px] w-full sm:w-[200px] bg-gray-300 flex items-center justify-center text-sm rounded-2xl">
              No Image
            </div>
          )}
          <div className="flex-1">
            <div className={`inline-flex py-1 px-4 rounded-md items-center gap-2 mt-2 mb-3 cursor-pointer ${theme === 'dark' ? 'bg-gray-400/20 text-white/50' : 'bg-[#2f2fac4c] text-black/60'}`}>
                <FaWindows />
                PC
            </div>
            <h2 className="font-semibold text-2xl line-clamp-1 cursor-pointer hover:underline" onClick={() => navigate(`/game/${game.id}`)}>{game.name}</h2>
            <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-white/60' : 'text-black/60'} border-b sm:border-0`}>
              {descriptions[articles[0]?.slug]?.split(" ").slice(0, 70).join(" ") + '...' || 'Loading description...'}
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-white">No new games found.</p>
    )}
  </div>

          {/* Subscribe newsletter section */}
          <div className="flex justify-center items-center sm:justify-start sm:items-start col-span-1">
              <div
                className={`w-full ml-10 max-w-xs sm:max-w-full rounded-xl p-4 space-y-3 transition-all duration-300 text-center sm:text-left
                  ${theme === 'dark' ? 'bg-gray-400/10 text-white' : 'bg-[#2f2fac4c] text-black'}`}
              >
                <FaHeartbeat className="bg-orange-400/30 p-2 rounded-lg inline-block h-[40px] w-[40px] mx-auto sm:mx-0" />
                <h1 className="text-2xl font-semibold">Subscribe To Our Newsletter</h1>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-white/70' : 'text-black/70'
                  } line-clamp-2`}
                >
                  Join our growing network of readers who rely on us for timely, relevant, and trustworthy updates every week.
                </p>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`px-4 py-2 rounded-lg w-full ${
                    theme === 'dark'
                      ? 'bg-gray-400/20 text-white placeholder-white/60'
                      : 'bg-white/30 text-black placeholder-black/60'
                  }`}
                  placeholder="Enter Your Email"
                />
                <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl px-4 py-2 w-full">
                  Subscribe
                </button>
              </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
