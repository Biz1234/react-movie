import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import "../css/MovieDetails.css";
import ReactPlayer from 'react-player';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (err) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading movie details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return null;

  // Find the official trailer
  const trailer = movie.videos.results.find(
    video => video.type === "Trailer" && video.site === "YouTube"
  );

  return (
    <div className="movie-details">
      <div className="movie-container">
        {/* Backdrop with title overlay */}
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

        <div className="movie-content">
          {/* Poster */}
          <div className="movie-poster">
            <img 
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : '/placeholder-movie.jpg'
              } 
              alt={movie.title} 
            />
          </div>

          {/* Movie info */}
          <div className="movie-info">
            <div className="movie-meta">
              <div className="meta-item">
                <span className="meta-value">{movie.vote_average.toFixed(1)}</span>
                <span className="meta-label">Rating</span>
              </div>
              <div className="meta-item">
                <span className="meta-value">{movie.runtime}</span>
                <span className="meta-label">Minutes</span>
              </div>
              <div className="meta-item">
                <span className="meta-value">{movie.release_date.split("-")[0]}</span>
                <span className="meta-label">Year</span>
              </div>
            </div>

            <div>
              <h3>Overview</h3>
              <p className="movie-overview">{movie.overview}</p>
            </div>

            <div>
              <h3>Genres</h3>
              <div className="genre-list">
                {movie.genres.map(genre => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cast section */}
        {movie.credits.cast.length > 0 && (
          <div className="cast-section">
            <h2 className="section-title">Cast</h2>
            <div className="cast-grid">
              {movie.credits.cast.slice(0, 12).map(person => (
                <div key={person.id} className="cast-card">
                  <img 
                    src={person.profile_path 
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}` 
                      : '/placeholder-person.jpg'
                    } 
                    alt={person.name} 
                    className="cast-image"
                  />
                  <div className="cast-info">
                    <h4 className="cast-name">{person.name}</h4>
                    <p className="cast-character">{person.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trailer section */}
        {trailer && (
          <div className="trailer-section">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;