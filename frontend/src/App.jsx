
import './App.css'
import MovieCard from './components/MovieCard'
function App() {
 
  return (
<>
<MovieCard movie={{title: "tims film", release_date: "2024"}}/>
<MovieCard movie={{title: "booz film", release_date: "2023"}}/>
</>
  );
    
}


export default App
