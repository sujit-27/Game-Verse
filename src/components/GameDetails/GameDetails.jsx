import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGameDetails } from '../../features/gameDetailsSlice';

const GameDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const { data: gameDetails, loading, error } = useSelector((state) => state.gameDetails);


  useEffect(() => {
    dispatch(fetchGameDetails(id));
  }, [dispatch, id]);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen px-4 py-10 ${isDark ? 'bg-[#0e0e3d] text-white' : 'bg-white/20 text-black'}`}>
      {loading || !gameDetails ? (
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded-xl mb-6"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/2"></div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white/10 dark:bg-white/10 p-6 rounded-xl shadow-md">
          {gameDetails.background_image ? (
            <img
              src={gameDetails.background_image}
              alt={gameDetails.name}
              className="w-full h-[300px] object-cover rounded-xl mb-6"
            />
          ) : (
            <div className="w-full h-[300px] bg-gray-300 flex items-center justify-center rounded-xl mb-6">
              No Image Available
            </div>
          )}

          <h1 className={`text-3xl font-bold mb-4 text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{gameDetails.name}</h1>

          <div className="flex gap-4 text-sm text-white/80 dark:text-white/70 mb-4">
            <span className={`bg-gray-600/20 px-3 py-1 rounded-full text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>⭐ Rating: {gameDetails.rating || 'N/A'}</span>
            <span className={`bg-gray-600/20 px-3 py-1 rounded-full text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>📅 Released: {gameDetails.released || 'N/A'}</span>
            <span className={`bg-gray-600/20 px-3 py-1 rounded-full text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>🎮 Platforms: {gameDetails.platforms?.map(p => p.platform.name).join(', ')}</span>
          </div>

          <p className={`text-center leading-relaxed ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            {gameDetails.description_raw || 'No description available.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
