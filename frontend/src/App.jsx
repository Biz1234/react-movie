
import './App.css'
import MovieCard from './components/MovieCard'
import Home from './pages/favorites';
function App() {
 
  return (
<>
<MovieCard movie={{title: "tims film", release_date: "2024"}}/>
<MovieCard movie={{title: "booz film", release_date: "2023"}}/>
<MovieCard movie={{title: "booz film", release_date: "2023"}}/>
</>
  );
    
}


export default App
