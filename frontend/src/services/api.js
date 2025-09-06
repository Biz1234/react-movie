

const API_KEY = "afa55fa909ddb4c1268779fc487151dd";
const BASE_URL = "https://api.themoviedb.org/3";


export const getPopularMovies = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
  const data = await response.json();
  return data; // return full object
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`);
  const data = await response.json();
  return data; // return full object
};

export const discoverMovies = async (params, page = 1) => {
  params.page = page;
  const queryParams = new URLSearchParams({ api_key: API_KEY, ...params });
  const response = await fetch(`${BASE_URL}/discover/movie?${queryParams}`);
  const data = await response.json();
  return data; // return full object
};




export const getMovieDetails = async (movieId) => {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`);
  const data = await response.json();
  console.log('Movie Details Response:', data); // Debug log
  return data;
};



export const getGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres;
};


