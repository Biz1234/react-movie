
import { use } from "react";
import MovieCard from "../components/MovieCard";
import { useState } from "react";

function Home(){
const [searchQuery, setSearchQuery] = useState("");


const movies = [
    {id: 1, title: "john wick", release_date: "2020"},
    {id: 2, title: "terminator", release_date: "2013"},
    {id: 3, title: "the matrix", release_date: "1999"},
  
];
const handlesearch = () => {

};

    return (
<div className="home">
    <form onSubmit={handlesearch} className="search-form">
        <input type="text" placeholder="serach for movies.." className="search-input" value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
<button type="submit" className="search-button">search</button>


    </form>
<div className="movies-grid">
    {movies.map((movie) =>(<MovieCard movie={movie} key={movie.id} />))}
</div>

</div>



    )
}
export default Home