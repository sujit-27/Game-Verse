import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewGamesByPage } from "../../features/allnewgamesSlice";
import {useNavigate} from 'react-router-dom'

const AllTrendingGames = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useSelector((state) => state.theme.mode);
    const { data: allGames = [], loading } = useSelector((state) => state.allNewGames || {});
    const [currentPage, setCurrentPage] = useState(1);

     const totalPages = 10;

    useEffect(() => {
        dispatch(fetchNewGamesByPage(currentPage));
    }, [dispatch, currentPage]);

    const skeletonArray = Array.from({ length: 20 });

  return (
    <div id='trending-games' className="py-10 bg-primary text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className={`text-3xl font-bold mb-6  ${theme === 'dark' ? 'text-white' : 'text-black'}`}>All New Games</h1>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skeletonArray.map((_, idx) => (
              <div
                key={idx}
                className={`${
                  theme === 'dark' ? 'bg-[#1f1f37]' : 'bg-[#0e0e3d7f]'
                } rounded-xl p-4 shadow hover:shadow-lg transition mx-auto w-full max-w-[320px] sm:max-w-full`}
              >
                <div className='rounded-md h-[175px] w-full bg-gray-300 dark:bg-gray-700 animate-pulse' />
                <div className='mt-2 h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto animate-pulse' />
                <div className='mt-1 h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto animate-pulse' />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allGames
                     
            .map((game) => (
                
              <div key={game.id} className="bg-white/40  rounded-xl overflow-hidden shadow-md">
                {game.background_image ? (
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h2 className={`font-semibold text-lg text-center cursor-pointer hover:underline ${
                          theme === 'dark' ? 'text-white' : 'text-black'
                        }`} 
                    onClick={() => navigate(`/game/${game.id}`)}>{game.name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-10 flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="text-white px-4 py-2  dark:bg-gray-600 bg-gray-800 hover:bg-gray-500 rounded disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <span className={` ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllTrendingGames;
