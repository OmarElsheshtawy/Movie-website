import { useContext, useState } from "react";
import TVShowsContext from "./TVShowsContext";
import "./Home.css";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "./WishlistContext.jsx";




const TVShowsPage = () => {
  const navigate = useNavigate();
  const [inp, setInp] = useState("");
  const tvShows = useContext(TVShowsContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const toggleLike = (show) => {
    if (isInWishlist(show.id)) {
      removeFromWishlist(show.id);
    } else {
      addToWishlist(show);
    }
  };

  if (!tvShows || tvShows.length === 0) {
    return <div className="loading">Loading TV shows...</div>;
  }

  const filteredTVShows = tvShows.filter((e) =>
    e.name.toLowerCase().includes(inp.toLowerCase())
  );

  return (
    <div className="page-container">
      <section className="hero">
        <h1>📺 Welcome to Our TV Shows App</h1>
        <p>
          Millions of TV shows, series, and episodes to discover. Explore now.
        </p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a TV show..."
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />
          <button>Search</button>
        </div>
      </section>

      <section className="movies-section">
        <h2>📺 Popular TV Shows</h2>
        <div className="movies-grid">
          {filteredTVShows.map((show) => (
            <div 
              className="movie-card" 
              key={show.id}
              onClick={() => navigate(`/tv-shows/${show.id}`)}

            >
              <img
                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                alt={show.name}
              />
              <div className="movie-info">
                <div className="title-and-heart">
                  <h3>{show.name}</h3>
                  <AiFillHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(show);
                    }}
                    className={`heart-icon ${isInWishlist(show.id) ? 'filled' : 'empty'}`}
                  />
                </div>
                <p>📅 {show.first_air_date}</p>
                <span>⭐ {show.vote_average.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TVShowsPage; 