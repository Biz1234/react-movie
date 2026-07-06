import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/MovieDetails.css";
import ReactPlayer from "react-player";
import { FaHeart, FaArrowLeft, FaUser } from "react-icons/fa";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const loadMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  if (loading) return (
    <div className="details-loading">
      <div className="details-spinner" />
      <p>Loading…</p>
    </div>
  );

  if (error) return (
    <div className="details-error">
      <p>{error}</p>
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Go Back
      </button>
    </div>
  );

  if (!movie) return null;

  const favorite = isFavorite(movie.id);

  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="movie-details">
      <div className="movie-container">

        {/* Back button */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        {/* Backdrop */}
        {movie.backdrop_path && (
          <div className="movie-backdrop">
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
            />
            <div className="backdrop-overlay">
              <h1 className="movie-title">{movie.title}</h1>
            </div>
          </div>
        )}

        {/* Poster + Info */}
        <div className="movie-content">
          <div className="movie-poster-wrap">
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster-img"
              />
            ) : (
              <div className="no-poster-lg">🎬</div>
            )}
          </div>

          <div className="movie-info">
            {/* Meta stats */}
            <div className="movie-meta">
              <div className="meta-item">
                <span className="meta-value">{movie.vote_average?.toFixed(1) ?? "N/A"}</span>
                <span className="meta-label">Rating</span>
              </div>
              <div className="meta-item">
                <span className="meta-value">{movie.runtime ?? "—"}</span>
                <span className="meta-label">Minutes</span>
              </div>
              <div className="meta-item">
                <span className="meta-value">{movie.release_date?.split("-")[0] ?? "—"}</span>
                <span className="meta-label">Year</span>
              </div>
            </div>

            {/* Overview */}
            {movie.overview && (
              <div>
                <h3 className="info-heading">Overview</h3>
                <p className="movie-overview">{movie.overview}</p>
              </div>
            )}

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div>
                <h3 className="info-heading">Genres</h3>
                <div className="genre-list">
                  {movie.genres.map((genre) => (
                    <span key={genre.id} className="genre-tag">{genre.name}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Add / Remove Favorites */}
            <button
              className={`fav-detail-btn ${favorite ? "fav-detail-btn--active" : ""}`}
              onClick={() =>
                favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)
              }
            >
              <FaHeart />
              {favorite ? "Remove from Saved" : "Save to Favorites"}
            </button>
          </div>
        </div>

        {/* Cast — horizontal scroll on mobile */}
        {movie.credits?.cast?.length > 0 && (
          <section className="cast-section">
            <h2 className="section-title">Cast</h2>
            <div className="cast-scroll">
              {movie.credits.cast.slice(0, 12).map((person) => (
                <div key={person.id} className="cast-card">
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt={person.name}
                      className="cast-image"
                    />
                  ) : (
                    <div className="cast-placeholder">
                      <FaUser className="cast-placeholder-icon" />
                    </div>
                  )}
                  <div className="cast-info">
                    <h4 className="cast-name">{person.name}</h4>
                    <p className="cast-character">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Trailer */}
        {trailer && (
          <section className="trailer-section">
            <h2 className="section-title">Trailer</h2>
            <div className="video-container">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer.key}`}
                width="100%"
                height="100%"
                controls
                playing={false}
              />
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

export default MovieDetails;
