import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import UserContext from "./useCon";
import { useWishlist } from "./WishlistContext";
import "./MovieDetail.css";

const MovieDetail = () => {
  const { id } = useParams();
  const movies = useContext(UserContext);

  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const selected = movies.find((m) => m.id === parseInt(id));
    setMovie(selected);
  }, [id, movies]);

  useEffect(() => {
    const fetchRecommendations = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=e345caf876ded81a18c1032f33432e80`
      )
        .then((res) => res.json())
        .then((data) => {
          setRecommendations(data.results || []);
        })
        .catch((err) => {
          console.error("Failed to fetch recommendations:", err);
        });
    };

    const fetchReviews = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=e345caf876ded81a18c1032f33432e80`
      )
        .then((res) => res.json())
        .then((data) => {
          setReviews(data.results || []);
        })
        .catch((err) => {
          console.error("Failed to fetch reviews:", err);
        });
    };

    fetchRecommendations();
    fetchReviews();
  }, [id]);

  const toggleWishlist = () => {
    if (!movie) return;
    if (isInWishlist(movie.id)) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  if (!movie) return <p>Loading movie details...</p>;

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-content">
        <img
          className="movie-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-details">
          <div className="title-and-heart">
            <h1>{movie.original_title}</h1>
            <AiFillHeart
              onClick={toggleWishlist}
              className="heart-icon"
              style={{
                color: isInWishlist(movie?.id) ? "orange" : "#ccc",
                marginLeft: "1rem",
                cursor: "pointer",
              }}
              size={35}
              title={isInWishlist(movie?.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            />
          </div>
          <p><strong>📅 Release Date:</strong> {movie.release_date}</p>
          <p><strong>⭐ Rating:</strong> {movie.vote_average}</p>
          <p><strong>📖 Overview:</strong></p>
          <p>{movie.overview}</p>

          <Link to="/" className="back-to-home-btn">← Back to Homepage</Link>
        </div>
      </div>

      <div className="recommendations">
        <h2>🎯 Recommended Movies</h2>
        {recommendations.length > 0 ? (
          <div className="recommendation-grid">
            {recommendations.slice(0, 6).map((rec) => (
              <Link to={`/movie/${rec.id}`} key={rec.id} className="rec-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                  alt={rec.title}
                />
                <p>{rec.title}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>No recommendations found.</p>
        )}
      </div>

      <div className="reviews">
        <h2>💬 Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <strong>{review.author}:</strong> {review.content.slice(0, 300)}...
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
