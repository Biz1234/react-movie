
import { Link } from "react-router-dom"


function NavBar(){
return(

<nav className="navbar">
<div className="navbar-brand">
<link to="/">Movie App</link>
</div>
<div>
<link to="/" className="nav-link" >Home</link>
<link to="/favorites" className="nav-link" >Favorites</link>

</div>

</nav>




)



}