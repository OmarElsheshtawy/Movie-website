import { useContext, useState } from "react";
import UserContext from "./useCon";
import "./Home.css";
import { AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "./WishlistContext.jsx";


const HomePage = () => {
  const [inp, setInp] = useState("");
  const movies = useContext(UserContext);
  const navigate = useNavigate(); 
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const toggleLike = (movie) => {
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  if (!movies || movies.length === 0) {
    return <div className="loading">Loading movies...</div>;
  }

  const filteredMovies = movies.filter((e) =>
    e.original_title.toLowerCase().includes(inp.toLowerCase())
  );

  return (
    <div className="page-container">
      <section className="hero">
        <h1>🎬 Welcome to Our Movies App</h1>
        <p>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={inp}
            onChange={(e) => setInp(e.target.value)}
          />
          <button>Search</button>
        </div>
      </section>

      <section className="movies-section">
        <h2>🎥 Now Playing</h2>
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <div 
           
              className="movie-card" 
              key={movie.id}
                onClick={() => navigate(`/movie/${movie.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="movie-info">
                <div className="title-and-heart">
                  <h3>{movie.original_title}</h3>
                  <AiFillHeart
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(movie);
                    }}
                    className={`heart-icon ${isInWishlist(movie.id) ? 'filled' : 'empty'}`}
                  />
                </div>
                <p>📅 {movie.release_date}</p>
                <span>⭐ {movie.vote_average.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
