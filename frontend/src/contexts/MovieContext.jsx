import { createContext, useState, useEffect, useContext, Children } from "react";
import { useActionData } from "react-router-dom";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)
export const MovieProvider = ({Children}) => {
const [favorites, setFavorites] = useState([])

useEffect(() =>{
    const storedFavs = localStorage.getItem("favorites")
    if (storedFavs) setFavorites(JSON.parse(storedFavs))
}, []

)
useEffect(() => {

    localStorage.setItem('favorites', JSON.stringify(favorites))
}, [favorites])

const addFavorites = (movie) => {
    setFavorites(prev => [...prev, movie])
}

const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId))
}
const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId)
}

const 


return <MovieContext.Provider>
    {Children}
</MovieContext.Provider>

}