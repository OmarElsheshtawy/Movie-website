import { useContext } from "react";
import DetailsContext from "./DetailsContext";
import { Link } from "react-router-dom";
import "./Home.css";

const TVShowDetails = () => {
  const { data: show, loading, error } = useContext(DetailsContext);

  if (loading) return <div className="loading">Loading TV show details...</div>;
  if (error) return <div className="loading">Error: {error}</div>;
  if (!show) return <div className="loading">TV show not found</div>;

  return (
    <div className="page-container">
      <div
        className="movie-card"
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            style={{ width: "300px", height: "auto", borderRadius: "10px" }}
          />
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h1 style={{ color: "#f9cb2f", marginBottom: "1rem" }}>
              {show.name}
            </h1>
            <p style={{ color: "#333", marginBottom: "1rem" }}>
              {show.overview}
            </p>
            <div style={{ marginBottom: "1rem", color:"black"}}>
              <p><b>First Air Date:</b> {show.first_air_date}</p>
              <p><b>Last Air Date:</b> {show.last_air_date}</p>
              <p><b>Number of Seasons:</b> {show.number_of_seasons}</p>
              <p><b>Number of Episodes:</b> {show.number_of_episodes}</p>
              <p><b>Status:</b> {show.status}</p>
              <p><b>Rating:</b> ⭐ {show.vote_average?.toFixed(1)}</p>
              <p><b>Vote Count:</b> {show.vote_count}</p>
            </div>
            <div style={{ marginTop: "2rem" }}>
              <Link
                to="/tv-shows"
                style={{
                  background: "#f9cb2f",
                  color: "#000",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "8px",
                  textDecoration: "none",
                  display: "inline-block",
                  fontWeight: "bold",
                }}
              >
                ← Back to TV Shows
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetails;
