import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"
import { Link } from "react-router-dom";

function MovieCard({movie}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        e.stopPropagation()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    // Format rating to one decimal place
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'

    return (
      <Link to={`/movie/${movie.id}`} className="movie-card">
        <div className="movie-poster">
          {movie.poster_path ? (
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title} 
              loading="lazy"
            />
          ) : (
            <div className="no-poster">No Image Available</div>
          )}
          <div className="movie-overlay">
            <button 
              className={`favorite-btn ${favorite ? "active" : ""}`} 
              onClick={onFavoriteClick}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              ♥
            </button>
            {movie.vote_average > 0 && (
              <div className="rating-badge">
                ⭐ {rating}
              </div>
            )}
          </div>
        </div>
        <div className="movie-info">
          <h3>{movie.title}</h3>
          <p>{movie.release_date ? movie.release_date.split("-")[0] : 'Unknown year'}</p>
        </div>
      </Link>
    );
}

export default MovieCard