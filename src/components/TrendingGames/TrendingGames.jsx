import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGames } from '../../features/gameSlice'
import character from '../../assets/character2.png'
import { useNavigate } from "react-router-dom";


const TrendingGames = () => {
  const dispatch = useDispatch()
  const { data: games=[], loading, error } = useSelector((state) => state.games)
  const theme = useSelector((state) => state.theme.mode)

  useEffect(() => {
    dispatch(fetchGames())
  }, [dispatch])

  const navigate = useNavigate();


  const skeletonArray = Array.from({ length: 10 })

  return (
    <>
      <section id='trending' className='sm:ml-40 my-10'>
        <div className='max-w-7xl mx-auto sm:relative'>
          {/* Header Section */}
          <div className="flex flex-row flex-wrap justify-between items-center gap-3 mt-4">
            <h1 className="text-lg sm:text-3xl font-bold whitespace-nowrap">
              Currently Trending Games
            </h1>
            <button
              onClick={() => navigate("/trending-games")}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-600/70 text-black/70'
              } font-semibold rounded-xl px-4 py-2 transition cursor-pointer`}
            >
              View All
            </button>
          </div>



          {/* Trending Games section */}
          <div className='relative'>
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mt-8'>
              {loading
                ? skeletonArray.map((_, idx) => (
                    <div
                      key={idx}
                      className={`${
                        theme === 'dark'
                          ? 'bg-[#1f1f37]'
                          : 'bg-[#0e0e3d8d]'
                      } rounded-xl p-4 shadow hover:shadow-lg transition mx-auto w-full max-w-[320px] sm:max-w-full`}
                    >
                      <div className='flex justify-center'>
                        <div className='rounded-md h-[175px] w-full bg-gray-300 dark:bg-gray-700 animate-pulse' />
                      </div>
                      <div className='mt-2 h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse' />
                      <div className='mt-1 h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto animate-pulse' />
                    </div>
                  ))
                : games.map((game) => (
                    <div
                      key={game.id}
                      className={`${
                        theme === 'dark'
                          ? 'bg-[#1f1f37]'
                          : 'bg-[#2f2fac4c]'
                      } rounded-xl p-4 shadow hover:shadow-lg transition mx-auto w-full max-w-[320px] sm:max-w-full`}
                    >
                      <div className='flex justify-center'>
                        <img
                          loading='lazy'
                          src={game.background_image}
                          alt={game.name}
                          className='rounded-md h-[150px] object-cover'
                        />
                      </div>
                      <h3
                        className={`cursor-pointer hover:underline text-xl mt-2 text-center ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`}
                        onClick={() => navigate(`/game/${game.id}`)}
                      >
                        {game.name}
                      </h3>
                      <p
                        className={`text-sm text-center ${
                          theme === 'dark'
                            ? 'text-gray-400'
                            : 'text-gray-600'
                        }`}
                      >
                        Rating: {game.rating}
                      </p>
                    </div>
                  ))}
            </div>
          </div>

          {/* Character Image */}
          <img
            src={character}
            alt='Not-Found'
            className='hidden sm:block absolute left-[-360px] top-[-210px] z-[1] h-[135%] object-cover'
          />
        </div>
      </section>
    </>
  )
}

export default TrendingGames
