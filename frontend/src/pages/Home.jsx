import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies, getGenres, discoverMovies } from "../services/api";
import "../css/Home.css";

// Year options from current year down to 1900
const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = Array.from(
  { length: currentYear - 1899 },
  (_, i) => currentYear - i
);

const SKELETON_COUNT = 10;

function Home() {
  const [searchQuery, setSearchQuery]   = useState("");
  const [movies, setMovies]             = useState([]);
  const [error, setError]               = useState(null);
  const [loading, setLoading]           = useState(true);

  // filters
  const [genres, setGenres]             = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear]   = useState("");
  const [selectedSort, setSelectedSort]   = useState("popularity.desc");

  // pagination
  const [currentPage, setCurrentPage]   = useState(1);
  const [totalPages, setTotalPages]     = useState(1);

  // track last search query so retry can reuse it
  const [lastQuery, setLastQuery]       = useState(null);

  const fetchMovies = useCallback(async ({ query, genre, year, sort, page }) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (genre || year || sort !== "popularity.desc" || query?.trim()) {
        const params = {
          with_genres: genre,
          primary_release_year: year,
          sort_by: sort,
          page,
        };
        if (query?.trim()) params.query = query;
        data = await discoverMovies(params);
      } else {
        data = await getPopularMovies(page);
      }
      setMovies(data.results ?? []);
      setTotalPages(Math.min(data.total_pages ?? 1, 500)); // TMDB caps at 500
    } catch {
      setError("Failed to load movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load genres once
  useEffect(() => {
    getGenres().then(setGenres).catch(() => {});
  }, []);

  // Run fetch whenever page or lastQuery changes
  useEffect(() => {
    const q = lastQuery ?? { query: "", genre: "", year: "", sort: "popularity.desc", page: currentPage };
    fetchMovies({ ...q, page: currentPage });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, lastQuery]);

  // Scroll to top of results on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    const q = {
      query: searchQuery,
      genre: selectedGenre,
      year: selectedYear,
      sort: selectedSort,
      page: 1,
    };
    setCurrentPage(1);
    setLastQuery(q);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedSort("popularity.desc");
    setCurrentPage(1);
    setLastQuery(null);
  };

  const hasActiveFilters =
    searchQuery || selectedGenre || selectedYear || selectedSort !== "popularity.desc";

  const handleRetry = () => {
    const q = lastQuery ?? { query: "", genre: "", year: "", sort: "popularity.desc", page: currentPage };
    fetchMovies({ ...q, page: currentPage });
  };

  return (
    <div className="home">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          {/* Search row */}
          <div className="search-row">
            <input
              type="text"
              placeholder="Search for movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search movies"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? "Searching…" : "Search"}
            </button>
          </div>

          {/* Filter row with labels */}
          <div className="filter-row">
            <div className="filter-group">
              <label htmlFor="genre-filter" className="filter-label">Genre</label>
              <select
                id="genre-filter"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="filter-select"
              >
                <option value="">All Genres</option>
                {genres.map((g) => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="year-filter" className="filter-label">Year</label>
              <select
                id="year-filter"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="filter-select filter-select--year"
              >
                <option value="">Any Year</option>
                {YEAR_OPTIONS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="sort-filter" className="filter-label">Sort by</label>
              <select
                id="sort-filter"
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="filter-select"
              >
                <option value="popularity.desc">Popular</option>
                <option value="vote_average.desc">Top Rated</option>
                <option value="release_date.desc">Newest</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                className="clear-btn"
                onClick={handleClearFilters}
              >
                ✕ Clear
              </button>
            )}
          </div>
        </form>

        {/* Error state */}
        {error && (
          <div className="error-message">
            <span>{error}</span>
            <button className="retry-btn" onClick={handleRetry}>Try again</button>
          </div>
        )}
      </div>

      {/* Grid: skeleton while loading, real cards otherwise */}
      {loading ? (
        <div className="movies-grid">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {/* Empty results state */}
          {movies.length === 0 && !error && (
            <div className="empty-state">
              <span className="empty-icon">🎬</span>
              <h3>No movies found</h3>
              <p>Try adjusting your search or filters.</p>
              <button className="clear-btn" onClick={handleClearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {movies.length > 0 && (
            <>
              <div className="movies-grid">
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </div>

              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  aria-label="Previous page"
                >
                  ← Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
