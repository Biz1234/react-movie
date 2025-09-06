import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies, getGenres, discoverMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // filters
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSort, setSelectedSort] = useState("popularity.desc");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Load genres & popular movies
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [popularData, genreList] = await Promise.all([
          getPopularMovies(currentPage),
          getGenres(),
        ]);
        setMovies(popularData.results);
        setTotalPages(popularData.total_pages);
        setGenres(genreList);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, [currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setCurrentPage(1);
    try {
      let data;
      if (selectedGenre || selectedYear || selectedSort !== "popularity.desc") {
        const params = {
          with_genres: selectedGenre,
          primary_release_year: selectedYear,
          sort_by: selectedSort,
          page: currentPage,
        };
        if (searchQuery.trim()) params.query = searchQuery;
        data = await discoverMovies(params);
      } else if (searchQuery.trim()) {
        data = await searchMovies(searchQuery, currentPage);
      } else {
        data = await getPopularMovies(currentPage);
      }
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-row">
            <input
              type="text"
              placeholder="Search for movies..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              Search
            </button>
          </div>
          
          <div className="filter-row">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Release Year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="filter-input"
              min="1900"
              max="2030"
            />

            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="filter-select"
            >
              <option value="popularity.desc">Popular</option>
              <option value="vote_average.desc">Top Rated</option>
              <option value="release_date.desc">Newest</option>
            </select>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}
      </div>

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          {movies.length > 0 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;