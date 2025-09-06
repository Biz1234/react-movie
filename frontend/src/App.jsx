
import './css/App.css';
import Favorites from './pages/favorites';
import Home from './pages/Home';
import { Routes,Route } from 'react-router-dom';
import { MovieProvider } from './contexts/MovieContext';
import NavBar from "./components/NavBar"
import { ThemeProvider } from './contexts/ThemeContext';
import MovieDetails from './pages/MovieDetails';
function App() {
 
  return (
<ThemeProvider>
<MovieProvider>
<NavBar />
<main className='main-content'>
<Routes>
<Route path="/" element={<Home/>}  />
<Route path="/favorites" element={<Favorites/>}  />
<Route path="/movie/:id" element={<MovieDetails />} />
</Routes>

</main>
</MovieProvider>
</ThemeProvider>
  );
    
}


export default App
