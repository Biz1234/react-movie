import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { useState } from "react";

const SORT_OPTIONS = [
  { value: "added",   label: "Recently Added" },
  { value: "title",   label: "Title A–Z" },
  { value: "year",    label: "Newest First" },
  { value: "rating",  label: "Highest Rated" },
];

function Favorites() {
  const { favorites } = useMovieContext();
  const [sortBy, setSortBy] = useState("added");

  if (!favorites || favorites.length === 0) {
    return (
      <div className="favorites-empty-wrap">
        <div className="favorites-empty">
          <span className="empty-icon">🎬</span>
          <h2>No saved movies yet</h2>
          <p>Heart any movie on the home page and it will show up here.</p>
          <Link to="/" className="explore-link">Browse Movies</Link>
        </div>
      </div>
    );
  }

  const sorted = [...favorites].sort((a, b) => {
    if (sortBy === "title")  return a.title.localeCompare(b.title);
    if (sortBy === "year")   return (b.release_date ?? "").localeCompare(a.release_date ?? "");
    if (sortBy === "rating") return (b.vote_average ?? 0) - (a.vote_average ?? 0);
    return 0; // "added" — preserve original order
  });

  return (
    <div className="favorites">
      <div className="favorites-header">
        <div>
          <h2>Saved Movies</h2>
          <p className="favorites-count">
            {favorites.length} {favorites.length === 1 ? "movie" : "movies"}
          </p>
        </div>

        <div className="favorites-sort">
          <label htmlFor="fav-sort" className="sort-label">Sort by</label>
          <select
            id="fav-sort"
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="movies-grid fav-grid">
        {sorted.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
