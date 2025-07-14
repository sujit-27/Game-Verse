import React, { useEffect, useState } from "react";
import { useSearchParams ,useNavigate } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

  const apiKey = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://api.rawg.io/api/games?key=${apiKey}&search=${query}&page_size=20`
        );
        setResults(res.data.results);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for: <span className="text-blue-500">{query}</span>
      </h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : results.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map((game) => (
            <div
              key={game.id}
              className="bg-white/10 rounded-xl overflow-hidden shadow-md cursor-pointer"
//               onClick={() => window.location.href = `/game/${game.id}`}
            >
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
                <h2 
                    className="font-semibold text-lg text-center cursor-pointer hover:underline"
                    onClick={(e) => {
                        e.stopPropagation(); // prevents triggering parent card click
                        navigate(`/game/${game.id}`);
                    }}
                    >{game.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No results found for "{query}"</p>
      )}
    </div>
  );
};

export default SearchResults;
