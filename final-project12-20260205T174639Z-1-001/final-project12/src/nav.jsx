import "./nav.css";
import { Link, useLocation } from "react-router-dom";
import { useWishlist } from "./WishlistContext.jsx";

const Nav = () => {
  const location = useLocation();
  const { wishlistCount } = useWishlist();

  return (
    <div className="whole">
      <div className="navbar">
        <h1>Movie App</h1>
        <div className="nav-tabs">
          <Link 
            to="/" 
            className={`nav-tab ${location.pathname === "/" ? "active" : ""}`}
          >
            🎬 Movies
          </Link>
          <Link 
            to="/tv-shows" 
            className={`nav-tab ${location.pathname === "/tv-shows" ? "active" : ""}`}
          >
            📺 TV Shows
          </Link>
        </div>
        <div className="right-section">
          <span>En</span>
          <Link
            to="/wishlist"
            className="wishlist-link"
          >
            💛 Wishlist
            {wishlistCount > 0 && (
              <span className="wishlist-count">
                {wishlistCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
