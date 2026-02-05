import { useWishlist } from './WishlistContext.jsx';
import { useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineDelete } from 'react-icons/ai';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-container">
        <section className="wishlist-hero">
          <div className="wishlist-empty-icon">💝</div>
          <h1>My Wishlist</h1>
          <p>Your wishlist is empty. Start adding your favorite movies!</p>
          <button 
            className="wishlist-browse-btn"
            onClick={() => navigate('/')}
          >
             Browse Movies 
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <section className="wishlist-hero">
        <h1>💝 My Wishlist</h1>
        <p>You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist</p>
      </section>

      <section className="wishlist-section">
        <h2>🎬 My Favorite Items</h2>
        <div className="wishlist-grid">
          {wishlist.map((item) => {
            // Check if it's a movie or TV show based on available properties
            const isMovie = item.original_title !== undefined;
            const isTVShow = item.name !== undefined;
            
            return (
              <div 
                className="wishlist-movie-card" 
                key={item.id}
                onClick={() => {
                  if (isMovie) {
                    navigate(`/movie/${item.id}`);
                  } else if (isTVShow) {
                    navigate(`/tv-shows/${item.id}`);
                  }
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={isMovie ? item.original_title : item.name}
                />
                <div className="wishlist-movie-info">
                  <div className="wishlist-title-heart">
                    <h3>{isMovie ? item.original_title : item.name}</h3>
                    <div className="wishlist-icons">
                      <AiFillHeart
                        className="wishlist-heart-icon"
                      />
                      <AiOutlineDelete
                        className="wishlist-delete-icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromWishlist(item.id);
                        }}
                        title="Remove from wishlist"
                      />
                    </div>
                  </div>
                  <p>📅 {isMovie ? item.release_date : item.first_air_date}</p>
                  <span>⭐ {item.vote_average.toFixed(1)}</span>
                  <p style={{ fontSize: '0.8rem', color: '#ff6b35', marginTop: '5px' }}>
                    {isMovie ? '🎬 Movie' : '📺 TV Show'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default WishlistPage; 